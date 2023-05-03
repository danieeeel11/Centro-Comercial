package com.cc.centroscomerciales.modelo;

import jakarta.persistence.Entity;
import lombok.Data;
import jakarta.persistence.*;

@Entity
@Table(name= "centros_comerciales")
@Data
public class CentrosComerciales {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String logo;
    private String nombre;
    private String descripcion;
    private String horario;
    private String direccion;
    private String foto;
    private String vinculo;
    private String coordenadas;


    public CentrosComerciales(){

    }

    public CentrosComerciales(int id, String logo, String nombre, String descripcion, String horario, String direccion, String foto, String vinculo, String coordenadas) {
        this.id = id;
        this.logo = logo;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.horario = horario;
        this.direccion = direccion;
        this.foto = foto;
        this.vinculo = vinculo;
        this.coordenadas = coordenadas;
    }

    public Integer getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
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

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getFoto() {
        return foto;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }

    public String getVinculo() {
        return vinculo;
    }

    public void setVinculo(String vinculo) {
        this.vinculo = vinculo;
    }

    public String getCoordenadas() {
        return coordenadas;
    }

    public void setCoordenadas(String coordenadas) {
        this.coordenadas = coordenadas;
    }
}
