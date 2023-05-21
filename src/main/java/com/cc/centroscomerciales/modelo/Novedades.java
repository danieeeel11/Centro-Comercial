package com.cc.centroscomerciales.modelo;

import jakarta.persistence.*;

@Entity
@Table(name= "novedades")

public class Novedades {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int id_cc;
    private String noticia;
    private String titular;
    private String imagen;
    private String tiempo_pub;

    public Novedades(int id, int id_cc, String noticia, String titular, String imagen, String tiempo_pub) {
        this.id = id;
        this.id_cc = id_cc;
        this.noticia = noticia;
        this.titular = titular;
        this.imagen = imagen;
        this.tiempo_pub = tiempo_pub;
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

    public Novedades() {
    }

    public int getId_cc() {
        return id_cc;
    }

    public void setId_cc(int id_cc) {
        this.id_cc = id_cc;
    }

    public String getNoticia() {
        return noticia;
    }

    public void setNoticia(String noticia) {
        this.noticia = noticia;
    }

    public String getTitular() {
        return titular;
    }

    public void setTitular(String titular) {
        this.titular = titular;
    }

    public String getTiempo_pub() {
        return tiempo_pub;
    }

    public void setTiempo_pub(String tiempo_pub) {
        this.tiempo_pub = tiempo_pub;
    }
}
