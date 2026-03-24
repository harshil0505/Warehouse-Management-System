package com.warehouse.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.warehouse.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUserName(String userName);

    boolean existsByUserName(String userName);
}