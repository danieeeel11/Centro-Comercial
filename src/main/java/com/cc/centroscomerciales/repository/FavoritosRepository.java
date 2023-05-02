package com.cc.centroscomerciales.repository;

import com.cc.centroscomerciales.interfaces.IFavoritos;
import com.cc.centroscomerciales.modelo.Favoritos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class FavoritosRepository {
    @Autowired
    private IFavoritos favoritosCrudRepository;
    public List<Favoritos> getAll(){
        return (List<Favoritos>) favoritosCrudRepository.findAll();
    }
    /*public List<Favoritos> getUserFavorito(String user){
        return favoritosCrudRepository.getUserClient(user);
    }*/
    public Optional<Favoritos> getFavorito(int id){
        return favoritosCrudRepository.findById(id);
    }
    public Favoritos save(Favoritos favoritos){
        return favoritosCrudRepository.save(favoritos);
    }
    public void delete(Favoritos favoritos){
        favoritosCrudRepository.delete(favoritos);
    }

}
