package com.niit.FavouriteMovieService.domain;

import org.springframework.data.annotation.Id;

public class FavouriteMovie {
    @Id
    private int id;
    private String title;
    private double vote_average;
    private String release_date;
    private String original_language;
    private String poster_path;

    // Constructor with parameters
    public FavouriteMovie(int id, String title, double vote_average, String release_date, String original_language, String poster_path) {
        this.id = id;
        this.title = title;
        this.vote_average = vote_average;
        this.release_date = release_date;
        this.original_language = original_language;
        this.poster_path = poster_path;
    }

    // Default constructor
    public FavouriteMovie() {
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public double getVote_average() {
        return vote_average;
    }

    public void setVote_average(double vote_average) {
        this.vote_average = vote_average;
    }

    public String getRelease_date() {
        return release_date;
    }

    public void setRelease_date(String release_date) {
        this.release_date = release_date;
    }

    public String getOriginal_language() {
        return original_language;
    }

    public void setOriginal_language(String original_language) {
        this.original_language = original_language;
    }

    public String getPoster_path() {
        return poster_path;
    }

    public void setPoster_path(String poster_path) {
        this.poster_path = poster_path;
    }

    // toString method
    @Override
    public String toString() {
        return "FavouriteMovie{" +
                "id='" + id + '\'' +
                ", title='" + title + '\'' +
                ", vote_average=" + vote_average +
                ", release_date=" + release_date +
                ", original_language='" + original_language + '\'' +
                ", poster_path='" + poster_path + '\'' +
                '}';
    }
}
