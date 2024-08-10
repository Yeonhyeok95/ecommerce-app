package com.goldoogi.back_app.provider;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

@Component
public class JwtProvider {

    // @Value("${secret-key}")
    // private String secretKey;
    SecretKey key = Jwts.SIG.HS256.key().build();

    public String create(String email) {
        Date expiredDate = Date.from(Instant.now().plus(1, ChronoUnit.HOURS));

        String jwt = Jwts.builder()
                        .subject(email)
                        .expiration(expiredDate)
                        .signWith(key)
                        .compact();
        
        return jwt;
    }

    public String validate(String jwt) {
        
        Claims claims = null;
        
        try {
            claims = Jwts.parser().verifyWith(key).build().parseSignedClaims(jwt).getPayload();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        return claims.getSubject();
    }
}