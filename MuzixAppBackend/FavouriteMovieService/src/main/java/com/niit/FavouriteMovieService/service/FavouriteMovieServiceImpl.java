package com.niit.FavouriteMovieService.service;

import com.niit.FavouriteMovieService.domain.FavouriteMovie;
import com.niit.FavouriteMovieService.domain.User;
import com.niit.FavouriteMovieService.exception.FavouriteMovieAlreadyExistException;
import com.niit.FavouriteMovieService.exception.FavouriteMovieNotFoundException;
import com.niit.FavouriteMovieService.exception.UserAlreadyExistException;
import com.niit.FavouriteMovieService.exception.UserNotFoundException;
import com.niit.FavouriteMovieService.proxy.IUserProxy;
import com.niit.FavouriteMovieService.repository.IFavouriteMovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class FavouriteMovieServiceImpl implements IFavouriteMovieService{
    IFavouriteMovieRepository iFavouriteMovieRepository;
    IUserProxy iUserProxy;

    @Autowired
    public FavouriteMovieServiceImpl(IFavouriteMovieRepository iFavouriteMovieRepository, IUserProxy iUserProxy) {
        this.iFavouriteMovieRepository = iFavouriteMovieRepository;
        this.iUserProxy =iUserProxy;
    }

    @Override
    public User registerUser(User user) throws UserAlreadyExistException {
        if (iFavouriteMovieRepository.findById(user.getEmail()).isPresent()){
            throw new UserAlreadyExistException();
        }
        User user1=iFavouriteMovieRepository.save(user);

        if (!user1.getEmail().isEmpty() && !user1.getPassword().isEmpty()){
            iUserProxy.saveUser(user1);
        }
        return user1;
    }
//
//    @Override
//    public User updateUser(User user,String userId) throws UserNotFoundException {
//        User existingUser=iFavouriteMovieRepository.findById(userId).get();
//        if (existingUser==null){
//            throw new UserNotFoundException();
//        }
//        if (user.getUsername() != null && !user.getUsername().isEmpty()) {
//            existingUser.setUsername(user.getUsername());
//        }
//        if(user.getEmail() != null && !user.getEmail().isEmpty()) {
//            existingUser.setEmail(user.getEmail());
//        }
//        if (user.getPassword() !=null && !user.getPassword().isEmpty()){
//            existingUser.setPassword(user.getPassword());
//        }
//        if (user.getImageUrl() !=null && !user.getImageUrl().isEmpty()){
//            existingUser.setImageUrl(user.getImageUrl());
//        }
//
//      User user1=  iFavouriteMovieRepository.save(existingUser);
//
//        if (!user1.getUserId().isEmpty()){
//            iUserProxy.updateUser(user);
//        }
//        return user1;
//    }

    @Override
    public User saveFavouriteMovieToList(FavouriteMovie favouriteMovie, String email) throws UserNotFoundException, FavouriteMovieAlreadyExistException {
        // Check if user exists in the repository
        Optional<User> optionalUser = iFavouriteMovieRepository.findById(email);
        if (optionalUser.isEmpty()) {
            throw new UserNotFoundException();
        }

        User user = optionalUser.get();

        // Initialize the movieDetails list if it is null
        if (user.getMovieDetails() == null) {
            user.setMovieDetails(new ArrayList<>());
        }

        // Check if the movie already exists in the user's favorite list
        for (FavouriteMovie movie : user.getMovieDetails()) {
            if (movie.getId() == favouriteMovie.getId()) {
                throw new FavouriteMovieAlreadyExistException();
            }
        }

        // Add the movie to the user's favorite list
        user.getMovieDetails().add(favouriteMovie);

        // Save the user with the updated movie list
        return iFavouriteMovieRepository.save(user);
    }


    @Override
    public List<FavouriteMovie> getAllFavouriteMoviesFromList(String email) throws UserNotFoundException {
        // Get all products from the User list
        if(iFavouriteMovieRepository.findById(email).isEmpty())
        {
            throw new UserNotFoundException();
        }
        return iFavouriteMovieRepository.findById(email).get().getMovieDetails();
    }
    @Override
    public void deleteMovieFromFavList(String email, int id) throws UserNotFoundException, FavouriteMovieNotFoundException {
        User existingUser = iFavouriteMovieRepository.findById(email)
                .orElseThrow(UserNotFoundException::new);

        List<FavouriteMovie> movieDetails = existingUser.getMovieDetails();

        // Use '==' for comparison since 'id' is now an int
        Optional<FavouriteMovie> movieToDelete = movieDetails.stream()
                .filter(movie -> movie.getId() == id)
                .findFirst();

        if (movieToDelete.isPresent()) {
            movieDetails.remove(movieToDelete.get());
            existingUser.setMovieDetails(movieDetails);
            iFavouriteMovieRepository.save(existingUser);
        } else {
            throw new FavouriteMovieNotFoundException();
        }
    }


//    @Override
//    public List<FavouriteMovie> searchMovieFromFavList(String title, String userId) throws UserNotFoundException {
//        List<FavouriteMovie> movieList = iFavouriteMovieRepository.findByMovieDetails_title(title);
//        if (movieList.isEmpty()) {
//            throw new UserNotFoundException();
//        }
//        return movieList;
//    }
}
