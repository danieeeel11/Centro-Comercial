package com.cc.centroscomerciales.interfaces;

import com.cc.centroscomerciales.modelo.Favoritos;
import org.springframework.data.repository.CrudRepository;

public interface IFavoritos extends CrudRepository<Favoritos,Integer> {
    /*@Query("SELECT c FROM Favoritos AS c WHERE c.usuario LIKE :user")
    public List<Favoritos> getUserClient(String user);*/
}
