package com.warehouse.Security.Responce;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class UserInfoResponse {
       
    
    private Long id;
    private String userName;

    private List<String> roles;
    private String token;

   public UserInfoResponse(Long id, String userName, List<String> roles) {
        this.id = id;
        this.userName = userName;
        this.roles = roles;
        this.token = null;
   }
}
 