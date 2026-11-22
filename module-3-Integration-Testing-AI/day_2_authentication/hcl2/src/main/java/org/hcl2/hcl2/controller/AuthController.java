package org.hcl2.hcl2.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.hcl2.hcl2.dto.AuthRequest;
import org.hcl2.hcl2.repository.UserRepository;
import org.hcl2.hcl2.service.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public ResponseEntity<?> register(@Valid @RequestBody AuthRequest req){
        if(userRepository.findByUsername(req.username()).isPresent()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(
                    Map.of("error", "Username already exists")
            );
        }
        Users.save(new User(req.username(),encoder.encode(req.password()));
        return ResponseEntity.ok(Map.of("message", "user registered successfully"));
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody AuthRequest req)
    {
        var user = users.findByUsername(req.username()).orElse(null);
        if(user == null || !encoder.matches(req.password(),user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "username or password is incorrect"));
        }
        return ResponseEntity.ok(
                new AuthResponse(jwt.generateToken(user.getUsername())
                        ,user.getUsername()));

    }
}
