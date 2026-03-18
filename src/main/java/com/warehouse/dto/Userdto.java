package com.warehouse.dto;

import com.warehouse.model.AppRole;


import lombok.Data;

@Data
public class Userdto {
    private Long userId;
    private String username;
    private String password;
}
