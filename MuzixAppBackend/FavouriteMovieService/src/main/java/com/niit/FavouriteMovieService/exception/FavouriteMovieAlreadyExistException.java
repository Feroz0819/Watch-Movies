package com.niit.FavouriteMovieService.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT,reason = "Movie Already Exists")
public class FavouriteMovieAlreadyExistException extends Exception {
}
