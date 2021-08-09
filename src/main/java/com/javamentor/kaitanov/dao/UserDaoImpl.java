package com.javamentor.kaitanov.dao;

import com.javamentor.kaitanov.model.User;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class UserDaoImpl implements UserDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void add(User user) {
        entityManager.persist(user);
    }

    @Override
    public List<User> getAllWithRoles() {
        return entityManager.createQuery("FROM User u JOIN FETCH u.roles", User.class).getResultList();
    }

    @Override
    public void delete(Long id) {
        entityManager.remove(findByIdWithRoles(id));
    }

    @Override
    public void update(User user) {
        entityManager.merge(user);
    }

    @Override
    public User findByIdWithRoles(Long id) {
        return entityManager.createQuery("FROM User u JOIN FETCH u.roles WHERE u.id = :id", User.class).setParameter("id", id).getSingleResult();
    }

    @Override
    public User findByUsernameWithRoles(String username) {
        return entityManager.createQuery("FROM User u JOIN FETCH u.roles WHERE u.username = :username", User.class).setParameter("username", username).getSingleResult();
    }
}
