package com.cc.centroscomerciales.modelo;
import jakarta.persistence.*;
@Entity
@Table(name= "favoritos_tienda")
public class FavoritosTienda {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int id_Cliente;
    private int id_Tienda;
    public FavoritosTienda(int id, int id_Cliente, int id_Tienda) {
        this.id = id;
        this.id_Cliente = id_Cliente;
        this.id_Tienda = id_Tienda;
    }

    public FavoritosTienda() {
    }

    public Integer getId() { return id; }
    public void setId(int id) { this.id = id; }
    public Integer getId_Tienda() { return id_Tienda; }
    public void setId_Tienda(int id_Tienda) { this.id_Tienda = id_Tienda; }
    public Integer getId_Cliente() { return id_Cliente; }
    public void setId_Cliente(int id_Cliente) { this.id_Cliente = id_Cliente; }
}