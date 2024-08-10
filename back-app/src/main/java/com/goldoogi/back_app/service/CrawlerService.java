package com.goldoogi.back_app.service;

import com.goldoogi.back_app.service.impl.crawler.ScraperType;

public interface CrawlerService {
    void performScrapping(ScraperType scraperType);
}
