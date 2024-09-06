package com.niit.FavouriteMovieService.controller;

import com.niit.FavouriteMovieService.domain.FavouriteMovie;
import com.niit.FavouriteMovieService.domain.User;
import com.niit.FavouriteMovieService.exception.FavouriteMovieAlreadyExistException;
import com.niit.FavouriteMovieService.exception.FavouriteMovieNotFoundException;
import com.niit.FavouriteMovieService.exception.UserAlreadyExistException;
import com.niit.FavouriteMovieService.exception.UserNotFoundException;
import com.niit.FavouriteMovieService.service.IFavouriteMovieService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v2")
public class FavouriteMovieController {
    ResponseEntity responseEntity;
    IFavouriteMovieService iFavouriteMovieService;

    @Autowired
    public FavouriteMovieController(IFavouriteMovieService iFavouriteMovieService) {
        this.iFavouriteMovieService = iFavouriteMovieService;
    }

//    private String getUserIdFromClaims(HttpServletRequest request) {
//        Claims claims = (Claims) request.getAttribute("claims");
//        System.out.println("User ID from claims :: " + claims.getSubject());
//        return claims.getSubject();
//    }

//    private String getUserIdFromClaims(HttpServletRequest request) {
//        Claims claims = (Claims) request.getAttribute("claims");
//        if (claims != null && claims.get("userId") != null) {
//            return claims.get("userId").toString();
//        }
//        return null;
//    }

    private String getEmailFromClaims(HttpServletRequest request) {
        Claims claims = (Claims) request.getAttribute("claims");
        if (claims != null) {
            return claims.get("userEmail", String.class);
        }
        return null;
    }

    @PostMapping("/register")
    public ResponseEntity registerUser(@RequestBody User user) throws UserAlreadyExistException {
        try {
            User registeredUser = iFavouriteMovieService.registerUser(user);
            responseEntity = new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
        } catch (UserAlreadyExistException e) {
            throw new UserAlreadyExistException();
        } catch (Exception e) {
            responseEntity = new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return responseEntity;
    }

//    @PutMapping("/user/update")
//    public ResponseEntity updateUser(@RequestBody User user, HttpServletRequest request) throws UserNotFoundException {
//        try {
//            User updatedUser = iFavouriteMovieService.updateUser(user, getUserIdFromClaims(request));
//            responseEntity = new ResponseEntity<>("updated", HttpStatus.OK);
//        } catch (UserNotFoundException e) {
//            throw new UserNotFoundException();
//        } catch (Exception e) {
//            responseEntity = new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//        return responseEntity;
//    }


    @PostMapping("/user/saveFavouriteMovie")
    public ResponseEntity<?> saveMovieToUserFavorites(@RequestBody FavouriteMovie favouriteMovie, HttpServletRequest request) throws UserNotFoundException, FavouriteMovieAlreadyExistException {
            try {
                // Extract userId from JWT claims or any other method you're using
                String email = getEmailFromClaims(request);
                System.out.println(email);
                if (email == null || email.isEmpty()) {
                    return new ResponseEntity<>("email is missing from claims", HttpStatus.UNAUTHORIZED);
                }

                // Validate the FavouriteMovie object
                if (favouriteMovie.getId() == 0) {  // Assuming ID is an int and can't be 0
                    return new ResponseEntity<>("Movie ID cannot be null or zero", HttpStatus.BAD_REQUEST);
                }

                // Save the favourite movie to the user's list
                User updatedUser = iFavouriteMovieService.saveFavouriteMovieToList(favouriteMovie, email);
                return new ResponseEntity<>(updatedUser, HttpStatus.CREATED);

            } catch (UserNotFoundException e) {
                throw new UserNotFoundException();
            } catch (FavouriteMovieAlreadyExistException e) {
              throw new FavouriteMovieAlreadyExistException();
            } catch (Exception e) {
                return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
            }

    }
    @GetMapping("/user/getAllFavouriteMovies")
    public ResponseEntity<?> getAllMoviesFromUserFavorites(HttpServletRequest request) throws UserNotFoundException {
        try {
            responseEntity = new ResponseEntity<>(iFavouriteMovieService.getAllFavouriteMoviesFromList(getEmailFromClaims(request)), HttpStatus.OK);
        } catch (UserNotFoundException e) {
            throw new UserNotFoundException();
        } catch (Exception e) {
            responseEntity = new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return responseEntity;
    }

    @DeleteMapping("/user/movies/{id}")
    public ResponseEntity<?> deleteMovieFromUserFavorites(@PathVariable int id, HttpServletRequest request) {
        try {
            // Extract userId from JWT claims
            String email = getEmailFromClaims(request);
            if (email == null || email.isEmpty()) {
                return new ResponseEntity<>("Invalid or missing email in token.", HttpStatus.UNAUTHORIZED);
            }

            // Call the service method to delete the movie from the user's favorites
            iFavouriteMovieService.deleteMovieFromFavList(email, id);

            return new ResponseEntity<>("Movie deleted successfully from user's favorites.", HttpStatus.OK);

        } catch (UserNotFoundException | FavouriteMovieNotFoundException e) {
            // Provide specific error messages
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);

        } catch (Exception e) {
            // Handle any other unexpected exceptions
            return new ResponseEntity<>("An error occurred while deleting the movie.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}
