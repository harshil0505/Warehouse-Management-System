package com.warehouse.Security;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.warehouse.Repository.RoleRepository;
import com.warehouse.Repository.UserRepository;
import com.warehouse.Security.JWT.AuthTokenFilter;
import com.warehouse.model.AppRole;
import com.warehouse.model.Role;
import com.warehouse.model.User;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig {

    @Autowired
    private AuthenticationEntryPoint unauthorizedHandler;

    @Autowired
    private AuthTokenFilter authTokenFilter;



 
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider(
            org.springframework.security.core.userdetails.UserDetailsService userDetailsService,
            org.springframework.security.crypto.password.PasswordEncoder passwordEncoder) {
    
        DaoAuthenticationProvider authProvider =
                new DaoAuthenticationProvider(userDetailsService);
    
        authProvider.setPasswordEncoder(passwordEncoder);
    
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(
            HttpSecurity http,
            DaoAuthenticationProvider authenticationProvider) throws Exception {

        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> {}) 
            .exceptionHandling(exception ->
                    exception.authenticationEntryPoint(unauthorizedHandler))
            .sessionManagement(session ->
                    session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                    .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                    .requestMatchers("/api/auth/**").permitAll()
                    .requestMatchers("/images/**").permitAll()
                    .requestMatchers("/v3/api-docs/**").permitAll()
                    .requestMatchers("/swagger-ui/**").permitAll()
                    .requestMatchers("/api/product/save/**").hasRole("ADMIN")
                    .requestMatchers("/api/admin/**").hasRole("ADMIN")
                    .requestMatchers("/api/staff/**").hasRole("STAFF")
                    .requestMatchers("/api/order/**").hasAnyRole("STAFF", "ADMIN")
                    .requestMatchers("/api/products/add").hasRole("ADMIN")
                    .requestMatchers("/api/customer/**").hasAnyRole( "ADMIN")
                    .requestMatchers("/api/inventory/**").permitAll()
                    .requestMatchers("/QRcode_product/**").permitAll() 
                    .anyRequest().authenticated()
            );

        
        http.authenticationProvider(authenticationProvider);
        http.addFilterBefore(authTokenFilter, UsernamePasswordAuthenticationFilter.class);
        http.headers(headers ->
                headers.frameOptions(frameOptions -> frameOptions.sameOrigin()));

        return http.build();
    }


@Bean
public WebSecurityCustomizer webSecurityCustomizer() {
    return web -> web.ignoring().requestMatchers(
        "/v2/api-docs",
        "/swagger-resources/**",
        "/swagger-ui.html",
        "/webjars/**"
    );
}
    
    @Bean
    CommandLineRunner initData(
            UserRepository userRepository,
            RoleRepository roleRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {

            Role userRole = roleRepository.findByRoleName(AppRole.STAFF)
                    .orElseThrow(() -> new RuntimeException("ROLE_DRIVER missing in DB"));

            Role adminRole = roleRepository.findByRoleName(AppRole.ADMIN)
                    .orElseThrow(() -> new RuntimeException("ROLE_ADMIN missing in DB"));
                    User admin = new User();
                    admin.setUserName("admin");
                    admin.setPassword(passwordEncoder.encode("admin123"));
                    admin.setRoles(Set.of(adminRole));
                    userRepository.save(admin);
                    
                    if (!userRepository.existsByUserName("user")) {
                        User user = new User();
                        user.setUserName("user");
                        user.setPassword(passwordEncoder.encode("staff123"));
                        user.setRoles(Set.of(userRole));
                        userRepository.save(user);
                    }
        };
    }
}
