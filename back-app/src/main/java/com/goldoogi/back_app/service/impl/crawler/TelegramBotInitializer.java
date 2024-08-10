package com.goldoogi.back_app.service.impl.crawler;

import java.util.List;

import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.telegram.telegrambots.meta.TelegramBotsApi;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;
import org.telegram.telegrambots.updatesreceivers.DefaultBotSession;

import com.goldoogi.back_app.entity.DCUserEntity;

@Component
public class TelegramBotInitializer {
    private final TelegramBot telegramBot;

    public TelegramBotInitializer(TelegramBot telegramBot) {
        this.telegramBot = telegramBot;
    }

    @EventListener({ ContextRefreshedEvent.class })
    public void init() {
        try {
            TelegramBotsApi botsApi = new TelegramBotsApi(DefaultBotSession.class);
            botsApi.registerBot(telegramBot);
            System.out.println("TelegramBot is initiating!");
            System.out.println("registered users so far:");
            List<DCUserEntity> users = telegramBot.getDcUserRepository().findAll();
            for (DCUserEntity eachUser : users) {
                System.out.println(eachUser.getId() + ": " + eachUser.getFirstName());
            }
            System.out.println();
        } catch (TelegramApiException e) {
            e.printStackTrace();
        }
    }
}
