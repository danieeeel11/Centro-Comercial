package com.cc.centroscomerciales.service;

import com.cc.centroscomerciales.modelo.Favoritos;
import com.cc.centroscomerciales.repository.FavoritosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FavoritosService {
    @Autowired
    private FavoritosRepository favoritosRepository;


    public List<Favoritos> getAll(){
        return favoritosRepository.getAll();
    }

    public Optional<Favoritos> getFavorito(int favoritoId) {
        return favoritosRepository.getFavorito(favoritoId);
    }

    /*public List<Favoritos> getUserFavorito(String user) {
        return favoritosRepository.getUserFavorito(user);
    }*/

    public Favoritos save(Favoritos favorito){
        return favoritosRepository.save(favorito);
        /*if(favorito.getId()==null){
            return favoritosRepository.save(favorito);
        }else{
            Optional<Favoritos> e= favoritosRepository.getFavorito(favorito.getId());
            if(!e.isPresent()){
                return favoritosRepository.save(favorito);
            }else{
                return favorito;
            }
        }*/
    }

    /*public Favoritos update(Favoritos favorito){
        if(favorito.getId_Cliente()!=null){
            Optional<Favoritos> e= favoritosRepository.getFavorito(favorito.getId_Cliente());
            if(e.isPresent()){
                if(favorito.favorito()!=null) {
                    e.get().setNombre(favorito.getNombre());
                }
                favoritosRepository.save(e.get());
                return e.get();
            }else{
                return favorito;
            }
        }else{
            return favorito;
        }
    }*/

    public boolean deleteFavorito(int id) {
        Boolean aBoolean = getFavorito(id).map(favorito -> {
            favoritosRepository.delete(favorito);
            return true;
        }).orElse(false);
        return aBoolean;
    }
}
