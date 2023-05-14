package com.cc.centroscomerciales.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private int id_Cliente;
    private String nombre;
    private String email;
    private String usuario;
    private String contrasenia;

}
