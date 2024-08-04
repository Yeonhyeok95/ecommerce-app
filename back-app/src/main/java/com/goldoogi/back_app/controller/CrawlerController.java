package com.goldoogi.back_app.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.goldoogi.back_app.service.crawlers.CrawlerService;
import com.goldoogi.back_app.service.crawlers.ScraperType;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/v1/crawler")
@RequiredArgsConstructor
public class CrawlerController {
    
    private final CrawlerService crawlerService;

    @GetMapping("/scrap")
    public ResponseEntity<String> runCrawler(@RequestParam ScraperType type) {
        crawlerService.performScrapping(type);
        return ResponseEntity.ok(type + " scrapper execution started!");
    }
}
