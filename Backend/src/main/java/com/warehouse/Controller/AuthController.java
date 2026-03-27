package com.warehouse.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.warehouse.Repository.RoleRepository;
import com.warehouse.Repository.UserRepository;
import com.warehouse.Security.JWT.JwtUtils;
import com.warehouse.Security.Requset.LoginRequest;
import com.warehouse.Security.Requset.SignupRequest;
import com.warehouse.Security.Responce.UserInfoResponse;
import com.warehouse.Security.ServiceSecurity.UserDetaileImpl;
import com.warehouse.model.AppRole;
import com.warehouse.model.Role;
import com.warehouse.model.User;

import jakarta.validation.Valid;

import org.springframework.http.HttpHeaders;
import java.util.*;
import java.util.stream.Collectors;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private AuthenticationManager authenticationManager;


    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication;
        try {
            authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getUserName(),
                    loginRequest.getPassword()
                )
            );
        } catch (AuthenticationException exception) {
            Map<String, Object> map = new HashMap<>();
            map.put("message", "Bad credentials");
            return new ResponseEntity<>(map, HttpStatus.UNAUTHORIZED);
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetaileImpl userDetails = (UserDetaileImpl) authentication.getPrincipal();

        ResponseCookie jwtCookie = jwtUtils.ganrateJwtCookie(userDetails);

        List<String> roles = userDetails.getAuthorities()
                .stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

                UserInfoResponse response = new UserInfoResponse(
                    userDetails.getId(),
                    userDetails.getUsername(),
                    roles,
            jwtCookie.getValue()
                );
                
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .body(response);
    }

 @PostMapping("/create-admin")
 @PreAuthorize("hasRole('ADMIN')")

public ResponseEntity<?> createAdmin(@Valid @RequestBody SignupRequest signupRequest) {

    if (userRepository.existsByUserName(signupRequest.getUserName())) {
        return ResponseEntity.badRequest().body("Error: Email is already in use!");
    }

    User admin = new User(
            null, signupRequest.getUserName(),
                        encoder.encode(signupRequest.getPassword()), null
    );

    Role adminRole = roleRepository.findByRoleName(AppRole.ADMIN)
            .orElseThrow(() -> new RuntimeException("ROLE_ADMIN not found"));

    admin.setRoles(Set.of(adminRole)); 
    userRepository.save(admin);

    return ResponseEntity.ok("Admin created successfully!");
}


@PostMapping("/signup")
public ResponseEntity<?> registerUser(
        @Valid @RequestBody SignupRequest signupRequest) {

    if (userRepository.existsByUserName(signupRequest.getUserName())) {
        return ResponseEntity.badRequest().body("Error: Username is already in use!");
    }

    User user = new User(
            null,
            signupRequest.getUserName(),
            encoder.encode(signupRequest.getPassword()),
            null
    );

    Set<String> strRoles = signupRequest.getRoles() != null
            ? signupRequest.getRoles()
            : new HashSet<>();

    Set<Role> roles = new HashSet<>();

    if (strRoles.isEmpty()) {

        Role staffRole = roleRepository.findByRoleName(AppRole.STAFF)
                .orElseThrow(() -> new RuntimeException("Error: STAFF role not found"));

        roles.add(staffRole);

    } else {

        strRoles.forEach(role -> {
            switch (role.trim().toUpperCase()) {

                case "ADMIN":
                    Role adminRole = roleRepository.findByRoleName(AppRole.ADMIN)
                            .orElseThrow(() -> new RuntimeException("Error: ADMIN role not found"));
                    roles.add(adminRole);
                    break;

                case "STAFF":
                    Role staffRole = roleRepository.findByRoleName(AppRole.STAFF)
                            .orElseThrow(() -> new RuntimeException("Error: STAFF role not found"));
                    roles.add(staffRole);
                    break;

                default:
                    throw new RuntimeException("Invalid role: " + role);
            }
        });
    }

    user.setRoles(roles);
    userRepository.save(user);

    return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(Map.of("message", "User registered successfully"));
}
    @GetMapping("/userDetails")
    public ResponseEntity<?> getUserDetails(Authentication authentication) {
        UserDetaileImpl userDetails = (UserDetaileImpl) authentication.getPrincipal();

        List<String> roles = userDetails.getAuthorities()
                .stream()
                .map(r -> r.getAuthority())
                .collect(Collectors.toList());

        UserInfoResponse response = new UserInfoResponse(
                userDetails.getId(),
                userDetails.getUsername(),
                
                roles,
                null
        );

        return ResponseEntity.ok(response);
    }

@GetMapping("/me")
public ResponseEntity<?> getCurrentUser(
        @RequestHeader(value = "Authorization", required = false) String authHeader) {

    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    String token = authHeader.substring(7);

    if (!jwtUtils.validateJwtToken(token)) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    String username = jwtUtils.getUserNameFromJwtToken(token);


        Optional<User> optionalUser = (Optional<User>) userRepository.findByUserName(username);

    if (optionalUser.isEmpty()) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("User not registered");
    }

    User user = optionalUser.get();

    Map<String, Object> response = new HashMap<>();
    response.put("id", user.getUserId());
    response.put("name", user.getUserName());
   
    

    return ResponseEntity.ok(response);
}


    @PostMapping("/signout")
    public ResponseEntity<?> signoutUser() {
        ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body("You've been signed out!");
    }
}
