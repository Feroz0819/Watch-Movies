package com.niit.UserAuthenticationService.service;

import com.niit.UserAuthenticationService.domain.User;
import com.niit.UserAuthenticationService.exception.InvalidCredentialsException;
import com.niit.UserAuthenticationService.exception.UserAlreadyExistsException;
import com.niit.UserAuthenticationService.exception.UserNotFoundException;
import com.niit.UserAuthenticationService.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements IUserService{
    IUserRepository iUserRepository;

    @Autowired
    public UserServiceImpl(IUserRepository iUserRepository) {
        this.iUserRepository = iUserRepository;
    }

    @Override
    public User saveUser(User user) throws UserAlreadyExistsException {
        if (iUserRepository.findById(user.getEmail()).isPresent()){
            throw new UserAlreadyExistsException();
        }
        return iUserRepository.save(user);
    }

//    @Override
//    public User updateUser(User user) throws UserNotFoundException {
//        if (iUserRepository.findById(user.getEmail()).isEmpty()) {
//            throw new UserNotFoundException();
//        }
//       User   existingUser=iUserRepository.findById(user.getEmail()).get();
//        if (user.getPassword() !=null && !user.getPassword().isEmpty()){
//            existingUser.setPassword(user.getPassword());
//        }
//        return iUserRepository.save(existingUser);
//    }

    @Override
    public User getUserByEmailAndPassword(String email, String password) throws InvalidCredentialsException {
        User user=iUserRepository.findByEmailAndPassword(email, password);
        if (user==null){
            throw new InvalidCredentialsException();
        }
        return user;
    }

    @Override
    public User updateUser(User user) {
        return null;
    }
}
