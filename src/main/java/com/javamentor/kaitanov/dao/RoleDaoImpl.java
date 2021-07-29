package com.javamentor.kaitanov.dao;

import com.javamentor.kaitanov.model.Role;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.HashSet;
import java.util.Set;

@Repository
public class RoleDaoImpl implements RoleDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Set<Role> getAll() {
        return new HashSet<>(entityManager.createQuery("FROM Role", Role.class).getResultList());
    }
}
