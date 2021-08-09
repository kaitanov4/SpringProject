package com.javamentor.kaitanov.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/user/page")
public class UserPageController {

    @GetMapping
    public String getPage() {
        return "userPage";
    }

}
