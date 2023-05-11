package com.cc.centroscomerciales.modelo;
import jakarta.persistence.*;

@Entity
@Table(name= "favoritos_prueba")
public class Favoritos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int id_CC;
    public Favoritos(int id, int id_CC) {
        this.id = id;
        this.id_CC = id_CC;
    }

    public Favoritos() {
    }

    public Integer getId() { return id; }
    public void setId(int id) { this.id = id; }
    public Integer getId_CC() { return id_CC; }
    public void setId_CC(int id_CC) { this.id_CC = id_CC; }
}
