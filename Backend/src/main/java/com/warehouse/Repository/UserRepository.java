package com.warehouse.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.warehouse.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User>  findByUserName(String userName);

    boolean existsByUserName(String userName);
}