package com.cc.centroscomerciales.modelo;

import jakarta.persistence.*;

@Entity
@Table(name= "novedades")

public class Novedades {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_cc;
    private String noticia;
    private String titular;
    private String tiempo_pub;

    public Novedades(int id_cc, String noticia, String titular, String tiempo_pub) {
        this.id_cc = id_cc;
        this.noticia = noticia;
        this.titular = titular;
        this.tiempo_pub = tiempo_pub;
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
