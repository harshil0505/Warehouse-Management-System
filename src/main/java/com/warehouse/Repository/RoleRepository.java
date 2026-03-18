package com.warehouse.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.warehouse.model.AppRole;
import com.warehouse.model.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByRoleName(AppRole role);


   

}
