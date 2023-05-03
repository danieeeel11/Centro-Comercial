package com.cc.centroscomerciales.repository;

import com.cc.centroscomerciales.interfaces.IFavoritosTienda;
import com.cc.centroscomerciales.modelo.FavoritosTienda;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class FavoritosTiendaRepository {
    @Autowired
    private IFavoritosTienda favoritosCrudRepository;

    /**
     * Obtener todos los favoritos
     * @return
     */
    public List<FavoritosTienda> getAll(){
        return (List<FavoritosTienda>) favoritosCrudRepository.findAll();
    }

    /**
     * Obtener lista de favoritos de un usuario
     * @param id_Cliente
     * @return
     */
    public List<FavoritosTienda> getClientsFav(int id_Cliente){ return favoritosCrudRepository.getClientsFav(id_Cliente); }

    /**
     * Obtener favorito
     * @param id_Cliente
     * @param id_Tienda
     * @return
     */
    public FavoritosTienda getFav(int id_Cliente, int id_Tienda){ return favoritosCrudRepository.getFav(id_Cliente, id_Tienda); }

    /**
     * Guardar favorito
     * @param favoritos
     * @return
     */
    public FavoritosTienda save(FavoritosTienda favoritos){ return favoritosCrudRepository.save(favoritos); }

    /**
     * Borrar favorito
     * @param favoritos
     */
    public void delete(FavoritosTienda favoritos){favoritosCrudRepository.delete(favoritos); }
}