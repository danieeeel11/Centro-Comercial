package com.cc.centroscomerciales.interfaces;

import com.cc.centroscomerciales.modelo.Favoritos;
<<<<<<< HEAD
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

=======
import org.springframework.data.repository.CrudRepository;

>>>>>>> DavidST3
public interface IFavoritos extends CrudRepository<Favoritos,Integer> {
    /*@Query("SELECT c FROM Favoritos AS c WHERE c.usuario LIKE :user")
    public List<Favoritos> getUserClient(String user);*/
}
