package com.niit.FavouriteMovieService.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code= HttpStatus.NOT_FOUND , reason = "Favourite Movie not found")
public class FavouriteMovieNotFoundException extends Throwable {
}
