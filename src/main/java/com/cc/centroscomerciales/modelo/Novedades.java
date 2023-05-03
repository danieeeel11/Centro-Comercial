package com.cc.centroscomerciales.modelo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name= "novedades")
@Data
public class Novedades {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_cc;
    private String noticia;
    private String titular;
    private String imagen;
    private String tiempo_pub;
}
