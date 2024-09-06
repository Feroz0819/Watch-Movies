package com.niit.UserAuthenticationService.security;

import com.niit.UserAuthenticationService.domain.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
@Service
public class JWTSecurityTokenGenerator implements SecurityTokenGenerator{
    public Map<String, String> generateToken(User user) {

        Map <String,Object> userdata=new HashMap<>();
        userdata.put("userEmail", user.getEmail());

        System.out.println(userdata);

        String JWTtoken;
        JWTtoken= Jwts.builder()

                .setClaims(userdata)
                //    .setSubject(user.getUsername())
                .setIssuedAt(new Date())

                .signWith(SignatureAlgorithm.HS256,"mysecret")
                .compact();

        Map <String,String> map = new HashMap<>(); //empty
        map.put("token",JWTtoken);
        map.put("message","Login Successfully");
        return map;

    }

}