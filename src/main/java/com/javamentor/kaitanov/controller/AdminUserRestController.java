package com.javamentor.kaitanov.controller;

import com.javamentor.kaitanov.model.User;
import com.javamentor.kaitanov.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/users")
public class AdminUserRestController {

    private final UserService userService;

    public AdminUserRestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<User>> getAll() {
        return new ResponseEntity<>(userService.getAllWithRoles(), HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUser(@PathVariable Long userId) {
        return new ResponseEntity<>(userService.findByIdWithRoles(userId), HttpStatus.OK);
    }

    @PostMapping("/{userId}/edit")
    public ResponseEntity<Void> update(@RequestBody User user) {
        userService.update(user);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{userId}/delete")
    public ResponseEntity<Void> delete(@PathVariable Long userId) {
        userService.delete(userId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/add")
    public ResponseEntity<Void> add(@RequestBody User user) {
        userService.add(user);
        return ResponseEntity.ok().build();
    }

}
