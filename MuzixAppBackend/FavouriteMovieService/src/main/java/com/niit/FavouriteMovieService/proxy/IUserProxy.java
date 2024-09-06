package com.niit.FavouriteMovieService.proxy;


import com.niit.FavouriteMovieService.domain.User;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name="UserAuthenticationService",url="localhost:8083")
public interface IUserProxy {
    @PostMapping("/api/v1/save")
    public ResponseEntity<?> saveUser(@RequestBody User user);

}

