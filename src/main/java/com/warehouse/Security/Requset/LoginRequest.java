package com.warehouse.Security.Requset;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {

    @Email
    private String userName;
    @NotBlank
    private String password;

    
    public java.util.Set<String> getRoles() {
        return null;
 
}
}
