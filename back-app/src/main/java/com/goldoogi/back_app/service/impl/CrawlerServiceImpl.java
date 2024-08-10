package com.goldoogi.back_app.service.impl;

import java.io.IOException;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.goldoogi.back_app.entity.PostEntity;
import com.goldoogi.back_app.repository.PostRepository;
import com.goldoogi.back_app.service.CrawlerService;
import com.goldoogi.back_app.service.impl.crawler.ScraperType;
import com.goldoogi.back_app.service.impl.crawler.TelegramBot;

@Service
public class CrawlerServiceImpl implements CrawlerService {

    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
    private boolean isScheduled = false;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private TelegramBot telegramBot;

    @Override
    public void performScrapping(ScraperType scraperType) {
        if (!isScheduled) {
            switch (scraperType) {
                case DC_INSIDE:
                    scheduler.scheduleAtFixedRate(this::dcInsideScrapper, 0, 30, TimeUnit.SECONDS);
                    break;
                
                case REDDIT:
                    scheduler.scheduleAtFixedRate(this::redditScrapper, 0, 30, TimeUnit.SECONDS);
                    break;
            }
            isScheduled = true;
            System.out.println(scraperType + " scrapping started.");
        } else {
            System.out.println(scraperType + " scrapping is already running.");
        }
    }

    private void dcInsideScrapper() {

        String URL_DCINSIDE = "https://gall.dcinside.com/board/lists/?id=dcbest";
        String URL_DCINSIDE_TEST_FREQUENT = "https://gall.dcinside.com/board/lists/?id=baseball_new11";

        // check the number of posts in the DB
        long count = postRepository.countPosts();
        if (count > 70) {

            /* deprecated version for low performance
            find the old posts to delete, keeping the most recent 70 posts
            List<UUID> oldPosts = postRepository.findOldPostByDate((int)(count-70));
            for (UUID oldPostid : oldPosts) {
                postRepository.deleteById(oldPostid);
            } */
            
            // find the old posts to delete, keeping the most recent 70 posts
            postRepository.deleteOldPosts((int) (count - 70));
        }

        try {
            Document doc = Jsoup.connect(URL_DCINSIDE).get();
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

                    // send message through telegram bot
                    telegramBot.notifyNewPost(postTitle, postUrl);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void redditScrapper() {

        String URL_REDDIT = "https://www.reddit.com/r/funny/";

        try {
            Document doc = Jsoup.connect(URL_REDDIT).get();
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
