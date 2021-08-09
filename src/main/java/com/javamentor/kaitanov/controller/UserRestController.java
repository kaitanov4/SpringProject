package com.javamentor.kaitanov.controller;

import com.javamentor.kaitanov.model.User;
import com.javamentor.kaitanov.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserRestController {

    @GetMapping("/current")
    public ResponseEntity<User> getCurrentUser(UsernamePasswordAuthenticationToken token) {
        return new ResponseEntity<>((User) token.getPrincipal(), HttpStatus.OK);
    }

}
