package com.cc.centroscomerciales.auth;

import com.cc.centroscomerciales.config.JwtService;
import com.cc.centroscomerciales.modelo.Cliente;
import com.cc.centroscomerciales.modelo.Role;
import com.cc.centroscomerciales.repository.ClienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final ClienteRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        var user = Cliente
                .builder()
                .id_Cliente(request.getId_Cliente())
                .nombre(request.getNombre())
                .email(request.getEmail())
                .usuario(request.getUsuario())
                .contrasenia(passwordEncoder.encode(request.getContrasenia()))
                .role(Role.USER)
                .build();
        repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsuario(), request.getContrasenia()));

        var user = repository.getUser(request.getUsuario()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

}
