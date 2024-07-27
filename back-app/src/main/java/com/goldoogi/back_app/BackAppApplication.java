package com.goldoogi.back_app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class BackAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackAppApplication.class, args);
	}
}
