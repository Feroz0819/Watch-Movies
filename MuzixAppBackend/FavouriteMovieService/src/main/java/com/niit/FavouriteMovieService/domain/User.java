package com.niit.FavouriteMovieService.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
public class User {

//    private String userId;
    private String username;
    private String password;
    @Id
    private String email;
    private List<FavouriteMovie> movieDetails;


    public User( String username, String password, String email, List<FavouriteMovie> movieDetails) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.movieDetails = movieDetails;
    }

    public User() {
    }

    @Override
    public String toString() {
        return "User{" +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", movieDetails=" + movieDetails +
                '}';
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<FavouriteMovie> getMovieDetails() {
        return movieDetails;
    }

    public void setMovieDetails(List<FavouriteMovie> movieDetails) {
        this.movieDetails = movieDetails;
    }

}
