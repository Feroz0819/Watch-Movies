package com.niit.FavouriteMovieService.repository;

import com.niit.FavouriteMovieService.domain.FavouriteMovie;
import com.niit.FavouriteMovieService.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface IFavouriteMovieRepository extends MongoRepository<User,String> {
    List<FavouriteMovie> findByMovieDetails_title(String title);//search movie from fav list based on title
}
