package com.cc.centroscomerciales.modelo;

import jakarta.persistence.*;

@Entity
@Table(name= "tiendas")

public class Tiendas {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String id_cc;
    private String nombre;
    private String logo;
    private String tipo_productos;
    private String nombre_productos;
    private String imagenes_productos;

    public Tiendas(){

    }

    public Tiendas(int id, String id_cc, String nombre, String logo, String tipo_productos, String nombre_productos, String imagenes_productos) {
        this.id = id;
        this.id_cc = id_cc;
        this.nombre = nombre;
        this.logo = logo;
        this.tipo_productos = tipo_productos;
        this.nombre_productos = nombre_productos;
        this.imagenes_productos = imagenes_productos;
    }

    public Integer getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getId_cc() {
        return id_cc;
    }

    public void setId_cc(String id_cc) {
        this.id_cc = id_cc;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public String getTipo_productos() {
        return tipo_productos;
    }

    public void setTipo_productos(String tipo_productos) {
        this.tipo_productos = tipo_productos;
    }

    public String getNombre_productos() {
        return nombre_productos;
    }

    public void setNombre_productos(String nombre_productos) {
        this.nombre_productos = nombre_productos;
    }

    public String getImagenes_productos() {
        return imagenes_productos;
    }

    public void setImagenes_productos(String imagenes_productos) {
        this.imagenes_productos = imagenes_productos;
    }
}
