package com.goldoogi.back_app.service.impl.crawler;

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
public class RedditScrapper {
    private final String URL = "https://www.reddit.com/r/funny/";

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private TelegramBot telegramBot;

    // @Scheduled(fixedRate = 10000)
    public void checkNewPosts() {
        System.out.println("Reddit is being scrapped!");
        try {
            Document doc = Jsoup.connect(URL).get();
            Elements posts = doc.select("article[aria-label]");
            System.out.println(posts.toString());

            for (Element post : posts) {
                String postId = post.select("shreddit-post").attr("id");
                if (!postRepository.existsByPostId(postId)) {
                    String postTitle = post.select("shreddit-post").attr("post-title");
                    String postUrl = post.select("shreddit-post").attr("content-href");

                    PostEntity newPost = new PostEntity();
                    newPost.setPostId(postId);
                    newPost.setTitle(postTitle);
                    newPost.setUrl(postUrl);
                    postRepository.save(newPost);

                    // send message through telegram bot
                    telegramBot.notifyNewPost(postTitle, postUrl);
                }
            }
            
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}
