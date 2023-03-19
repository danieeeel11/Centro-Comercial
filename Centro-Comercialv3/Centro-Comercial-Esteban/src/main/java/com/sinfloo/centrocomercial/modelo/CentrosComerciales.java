package com.sinfloo.centrocomercial.modelo;

import jakarta.persistence.*;

@Entity
@Table(name= "centroscomerciales")
public class CentrosComerciales {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String logo;
    private String nombre;
    private String descripcion;
    private String horario;
    private String direccion;

    public CentrosComerciales(){

    }

    public CentrosComerciales(int id, String logo, String nombre, String descripcion, String horario, String direccion) {
        this.id = id;
        this.logo = logo;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.horario = horario;
        this.direccion = direccion;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getHorario() {
        return horario;
    }

    public void setHorario(String horario) {
        this.horario = horario;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }
}
