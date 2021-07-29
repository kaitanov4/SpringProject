package com.javamentor.kaitanov.controller;

import com.javamentor.kaitanov.model.User;
import com.javamentor.kaitanov.service.RoleService;
import com.javamentor.kaitanov.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;
    private final RoleService roleService;

    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping
    public String getUserList(Model model) {
        model.addAttribute("users", userService.getAll());
        return "adminPage";
    }

    @GetMapping("/users/add")
    public String getAddUserPage(Model model) {
        model.addAttribute("user", new User());
        model.addAttribute("roles", roleService.getAll());
        return "addUser";
    }

    @PostMapping("/users/add")
    public String add(User user) {
        userService.add(user);
        return "redirect:/admin";
    }

    @GetMapping("/users/update/{id}")
    public String getUpdatePage(Model model, @PathVariable Long id) {
        model.addAttribute("user", userService.findById(id));
        model.addAttribute("roles", roleService.getAll());
        return "updateUser";
    }

    @PostMapping("/users/update/{id}")
    public String update(@ModelAttribute User user) {
        userService.update(user);
        return "redirect:/admin";
    }

    @PostMapping("/users/delete/{id}")
    public String delete(@PathVariable Long id) {
        userService.delete(id);
        return "redirect:/admin";
    }

}
