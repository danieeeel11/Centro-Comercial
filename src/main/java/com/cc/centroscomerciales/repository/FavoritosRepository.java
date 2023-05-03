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

    /**
     * Obtener todos los favoritos
     * @return
     */
    public List<Favoritos> getAll(){
        return (List<Favoritos>) favoritosCrudRepository.findAll();
    }

    /**
     * Obtener lista de favoritos de un usuario
     * @param id_Cliente
     * @return
     */
    public List<Favoritos> getClientsFav(int id_Cliente){ return favoritosCrudRepository.getClientsFav(id_Cliente); }

    /**
     * Obtener favorito
     * @param id_Cliente
     * @param id_CC
     * @return
     */
    public Favoritos getFav(int id_Cliente, int id_CC){ return favoritosCrudRepository.getFav(id_Cliente, id_CC); }

    /**
     * Guardar favorito
     * @param favoritos
     * @return
     */
    public Favoritos save(Favoritos favoritos){ return favoritosCrudRepository.save(favoritos); }

    /**
     * Borrar favorito
     * @param favoritos
     */
    public void delete(Favoritos favoritos){favoritosCrudRepository.delete(favoritos); }

    /*public List<Favoritos> getUserFavorito(String user){
            return favoritosCrudRepository.getUserClient(user);
        }*/
    /*public Optional<Favoritos> getFavorito(int id){
        return favoritosCrudRepository.findById(id);
    }*/
}