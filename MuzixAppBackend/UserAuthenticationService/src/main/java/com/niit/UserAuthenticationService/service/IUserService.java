package com.niit.UserAuthenticationService.service;


import com.niit.UserAuthenticationService.domain.User;
import com.niit.UserAuthenticationService.exception.InvalidCredentialsException;
import com.niit.UserAuthenticationService.exception.UserAlreadyExistsException;

public interface IUserService {
    User saveUser(User user) throws UserAlreadyExistsException;
//    User updateUser(User user) throws UserNotFoundException;
    User getUserByEmailAndPassword(String email, String password) throws InvalidCredentialsException;

    User updateUser(User user);
}
