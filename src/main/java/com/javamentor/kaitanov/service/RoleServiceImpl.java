package com.javamentor.kaitanov.service;

import com.javamentor.kaitanov.dao.RoleDao;
import com.javamentor.kaitanov.model.Role;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class RoleServiceImpl implements RoleService{

    private RoleDao roleDao;

    public RoleServiceImpl(RoleDao roleDao) {
        this.roleDao = roleDao;
    }

    @Override
    public Set<Role> getAll() {
        return roleDao.getAll();
    }

}
