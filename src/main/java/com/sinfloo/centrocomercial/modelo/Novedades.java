package com.sinfloo.centrocomercial.modelo;

import jakarta.persistence.*;

@Entity
@Table(name= "novedades")
public class Novedades {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String imagen;
    private String noticia;
    public Novedades(){

    }
    public Novedades(int id, String imagen, String noticia) {
        this.id = id;
        this.imagen = imagen;
        this.noticia = noticia;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public String getNoticia() {
        return noticia;
    }

    public void setNoticia(String noticia) {
        this.noticia = noticia;
    }
}
