package com.sinfloo.centrocomercial.modelo;

import jakarta.persistence.*;

@Entity
@Table(name= "clientes")
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_Cliente;
    private String nombre;
    private String email;
    private String usuario;
    private String contrasenia;

    public Cliente(int id_Cliente, String nombre, String email, String usuario, String contrasenia) {
        this.id_Cliente = id_Cliente;
        this.nombre = nombre;
        this.email = email;
        this.usuario = usuario;
        this.contrasenia = contrasenia;
    }

    public Cliente() {

    }

    public Integer getId_Cliente() {
        return id_Cliente;
    }

    public void setId_Cliente(int id_Cliente) {
        this.id_Cliente = id_Cliente;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getContrasenia() {
        return contrasenia;
    }

    public void setContrasenia(String contrasenia) {
        this.contrasenia = contrasenia;
    }
}
