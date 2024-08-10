package com.goldoogi.back_app.service.impl.crawler;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.api.objects.User;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

import com.goldoogi.back_app.entity.DCUserEntity;
import com.goldoogi.back_app.repository.DCUserRepository;

import lombok.Getter;
import lombok.Setter;

@Component("TelegramBot")
@Setter
@Getter
public class TelegramBot extends TelegramLongPollingBot {

    @Value("${telegram.bot.token}")
    private String botToken;

    @Value("${telegram.chat.id}")
    private String chatId;

    @Autowired
    private DCUserRepository dcUserRepository;
    
    @Override
    public void onUpdateReceived(Update update) {
        var msg = update.getMessage();
        User user = msg.getFrom();
        if (msg.getText().equals("/register")) {
            DCUserEntity newUser = new DCUserEntity();
            newUser.setId(user.getId());
            newUser.setFirstName(user.getFirstName());
            newUser.setLastName(user.getLastName());
            dcUserRepository.save(newUser);

            System.out.println("registered users:");
            List<DCUserEntity> users = dcUserRepository.findAll();
            for (DCUserEntity eachUser : users) {
                System.out.println(eachUser.getId() + ": " + eachUser.getFirstName());
            }

            return;
        }

        sendMessage(user.getId(), "connected!");
        System.out.println(user.getFirstName() + " wrote " + msg.getText());
    }
    
    public void notifyNewPost(String title, String url) {
        String message = "New Post has posted: " + title + "\n" + url;
        List<DCUserEntity> dcUsers = dcUserRepository.findAll();
        for (DCUserEntity eachDcUser : dcUsers) {
            sendMessage(eachDcUser.getId(), message);
        }
    }

    void sendMessage(Long chatId, String messageToSend) {
        SendMessage message = SendMessage.builder()
                                        .chatId(chatId.toString())
                                        .text(messageToSend).build();
        try {
            execute(message);
        } catch (TelegramApiException e) {
            e.printStackTrace();
        }
    }

    @Override
    public String getBotUsername() {
        return this.chatId;
    }
}
