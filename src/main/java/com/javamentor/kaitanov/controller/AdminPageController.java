package com.javamentor.kaitanov.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin/page")
public class AdminPageController {

    @GetMapping
    public String getPage() {
        return "adminPage";
    }

}
