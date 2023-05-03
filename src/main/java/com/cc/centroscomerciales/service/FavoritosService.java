package com.cc.centroscomerciales.service;

import com.cc.centroscomerciales.modelo.Favoritos;
import com.cc.centroscomerciales.repository.FavoritosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoritosService {
    @Autowired
    private FavoritosRepository favoritosRepository;

    /**
     * Obtener todos los favoritos
     * @return
     */
    public List<Favoritos> getAll(){ return favoritosRepository.getAll(); }

    /**
     * Obtener lista de favoritos de un usuario
     * @param id_Cliente
     * @return
     */
    public List<Favoritos> getClientsFav(int id_Cliente){ return favoritosRepository.getClientsFav(id_Cliente); }

    /**
     * Obtener favorito
     * @param id_Cliente
     * @param id_CC
     * @return
     */
    public Favoritos getFav(int id_Cliente, int id_CC){ return favoritosRepository.getFav(id_Cliente, id_CC); }

    /**
     * Guardar favorito
     * @param favorito
     * @return
     */
    public Favoritos save(Favoritos favorito){ return favoritosRepository.save(favorito); }

    /**
     * Borrar favorito
     * @param favorito
     */
    public void delete(Favoritos favorito){ favoritosRepository.delete(favoritosRepository.getFav(favorito.getId_Cliente(), favorito.getId_CC())); }

    /**
     * Determinar el estado, 1 si esta presente en favoritos, 0 si no esta presente
     * @param id_Cliente
     * @param id_CC
     * @return
     */
    public int estado(int id_Cliente, int id_CC){
        if (favoritosRepository.getFav(id_Cliente, id_CC) != null){
            return 1;
        }else{
            return 0;
        }
    }
}
