package com.cc.centroscomerciales.interfaces;

import com.cc.centroscomerciales.modelo.Favoritos;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface IFavoritos extends CrudRepository<Favoritos,Integer> {
    @Query("SELECT f FROM Favoritos AS f WHERE f.id_Cliente=:user")
    public List<Favoritos> getClientsFav(int user);

    @Query("SELECT f FROM Favoritos AS f WHERE f.id_Cliente=:user AND f.id_CC=:id_cc")
    public Favoritos getFav(int user, int id_cc);
}
