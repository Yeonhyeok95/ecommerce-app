package com.goldoogi.back_app.service;

import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.goldoogi.back_app.entity.PostEntity;
import com.goldoogi.back_app.repository.PostRepository;

@Service
public class DcInsideScrapper {
    private final String URL = "https://gall.dcinside.com/board/lists/?id=dcbest";
    private final String URL_TEST_FREQUENT = "https://gall.dcinside.com/board/lists/?id=baseball_new11";

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private TelegramBot telegramBot;

    @Scheduled(fixedRate = 30000)
    public void checkNewPosts() {
        System.out.println("Webcrawling has started!");
        try {
            Document doc = Jsoup.connect(URL).get();
            Elements posts = doc.select(".ub-content").select(".us-post");

            for (Element post : posts) {
                String postId = post.attr("data-no");
                if (!postRepository.existsByPostId(postId)) {
                    String postTitle = post.select(".ub-word").text();
                    String postUrl = "https://gall.dcinside.com" + post.select(".ub-word a").attr("href");

                    PostEntity newPost = new PostEntity();
                    newPost.setPostId(postId);
                    newPost.setTitle(postTitle);
                    newPost.setUrl(postUrl);
                    postRepository.save(newPost);

                    telegramBot.notifyNewPost(postTitle, postUrl);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


}
