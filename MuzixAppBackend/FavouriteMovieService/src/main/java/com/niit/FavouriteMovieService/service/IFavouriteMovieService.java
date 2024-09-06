package com.niit.FavouriteMovieService.service;

import com.niit.FavouriteMovieService.domain.FavouriteMovie;
import com.niit.FavouriteMovieService.domain.User;
import com.niit.FavouriteMovieService.exception.FavouriteMovieAlreadyExistException;
import com.niit.FavouriteMovieService.exception.FavouriteMovieNotFoundException;
import com.niit.FavouriteMovieService.exception.UserAlreadyExistException;
import com.niit.FavouriteMovieService.exception.UserNotFoundException;

import java.util.List;

public interface IFavouriteMovieService {
    User registerUser(User user) throws UserAlreadyExistException;
//    User updateUser(User user,String userId) throws UserNotFoundException;
    User saveFavouriteMovieToList(FavouriteMovie favouriteMovie, String email) throws UserNotFoundException, FavouriteMovieAlreadyExistException;
    List<FavouriteMovie> getAllFavouriteMoviesFromList(String email) throws UserNotFoundException;
    void deleteMovieFromFavList(String email, int id) throws UserNotFoundException, FavouriteMovieNotFoundException;

}
