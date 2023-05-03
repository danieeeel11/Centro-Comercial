package com.cc.centroscomerciales.interfaces;


import com.cc.centroscomerciales.modelo.FavoritosTienda;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface IFavoritosTienda extends CrudRepository<FavoritosTienda,Integer> {
    @Query("SELECT f FROM FavoritosTienda AS f WHERE f.id_Cliente=:user")
    public List<FavoritosTienda> getClientsFav(int user);

    @Query("SELECT f FROM FavoritosTienda AS f WHERE f.id_Cliente=:user AND f.id_Tienda=:id_Tienda")
    public FavoritosTienda getFav(int user, int id_Tienda);
}