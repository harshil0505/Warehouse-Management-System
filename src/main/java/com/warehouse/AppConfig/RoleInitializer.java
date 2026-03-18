package com.warehouse.AppConfig;

import org.springframework.stereotype.Component;

import com.warehouse.Repository.RoleRepository;
import com.warehouse.model.AppRole;
import com.warehouse.model.Role;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;


@Component
@RequiredArgsConstructor
public class RoleInitializer {

    private final RoleRepository roleRepository;

    @PostConstruct
    public void initRoles() {
        for (AppRole role : AppRole.values()) {
            roleRepository.findByRoleName(role)
               .orElseGet(() -> roleRepository.save(new Role(role)));
    }
}
}

