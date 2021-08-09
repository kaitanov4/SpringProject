package com.javamentor.kaitanov.service;

import com.javamentor.kaitanov.model.User;

import java.util.List;

public interface UserService {

    void add(User user);

    List<User> getAllWithRoles();

    void delete(Long id);

    void update(User user);

    User findByIdWithRoles(Long id);

    User findByUsernameWithRoles(String username);

}
