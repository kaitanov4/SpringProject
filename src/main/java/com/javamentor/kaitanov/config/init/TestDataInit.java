package com.javamentor.kaitanov.config.init;

import com.javamentor.kaitanov.model.User;
import com.javamentor.kaitanov.service.RoleService;
import com.javamentor.kaitanov.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Configuration;

import java.util.HashSet;

@Configuration
public class TestDataInit implements ApplicationRunner {

    private UserService userService;
    private final RoleService roleService;

    public TestDataInit(RoleService roleService) {
        this.roleService = roleService;
    }

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public void run(ApplicationArguments args) {
        /*User user = new User();
        user.setUsername("a12ex12ecaa2e");
        user.setPassword("123");
        user.setFirstName("asd");
        user.setLastName("asdasd");
        user.setActivity(true);
        user.setRoles(new HashSet<>(roleService.getAll()));
        userService.add(user);*/
    }
}
