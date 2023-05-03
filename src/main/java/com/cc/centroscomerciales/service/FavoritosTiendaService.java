package com.cc.centroscomerciales.service;

import com.cc.centroscomerciales.modelo.FavoritosTienda;
import com.cc.centroscomerciales.repository.FavoritosTiendaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoritosTiendaService {
    @Autowired
    private FavoritosTiendaRepository favoritosRepository;

    /**
     * Obtener todos los favoritos
     * @return
     */
    public List<FavoritosTienda> getAll(){ return favoritosRepository.getAll(); }

    /**
     * Obtener lista de favoritos de un usuario
     * @param id_Cliente
     * @return
     */
    public List<FavoritosTienda> getClientsFav(int id_Cliente){ return favoritosRepository.getClientsFav(id_Cliente); }

    /**
     * Obtener favorito
     * @param id_Cliente
     * @param id_Tiendas
     * @return
     */
    public FavoritosTienda getFav(int id_Cliente, int id_Tiendas){ return favoritosRepository.getFav(id_Cliente, id_Tiendas); }

    /**
     * Guardar favorito
     * @param favorito
     * @return
     */
    public FavoritosTienda save(FavoritosTienda favorito){ return favoritosRepository.save(favorito); }

    /**
     * Borrar favorito
     * @param favorito
     */
    public void delete(FavoritosTienda favorito){ favoritosRepository.delete(favoritosRepository.getFav(favorito.getId_Cliente(), favorito.getId_Tienda())); }

    /**
     * Determinar el estado, 1 si esta presente en favoritos, 0 si no esta presente
     * @param id_Cliente
     * @param id_Tiendas
     * @return
     */
    public int estado(int id_Cliente, int id_Tiendas){
        if (favoritosRepository.getFav(id_Cliente, id_Tiendas) != null){
            return 1;
        }else{
            return 0;
        }
    }
}
