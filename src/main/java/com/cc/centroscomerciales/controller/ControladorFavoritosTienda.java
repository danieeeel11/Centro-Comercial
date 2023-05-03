package com.cc.centroscomerciales.controller;
import com.cc.centroscomerciales.modelo.FavoritosTienda;
import com.cc.centroscomerciales.service.FavoritosTiendaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/api/FavoritosTienda")

public class ControladorFavoritosTienda {
    @Autowired
    private FavoritosTiendaService favoritosService;

    @GetMapping("/all")
    public List<FavoritosTienda> getFavoritos(){
        return favoritosService.getAll();
    }

    /**
     * Obtener lista de favoritos de un usuario
     * @param id_Cliente
     * @return
     */
    @GetMapping("/user")
    public List<FavoritosTienda> getCLienteFavs(@RequestParam int id_Cliente){ return favoritosService.getClientsFav(id_Cliente); }

    @GetMapping("/fav")
    public FavoritosTienda getFav(@RequestParam int id_Cliente, int id_Tienda){ System.out.println(favoritosService.getFav(id_Cliente, id_Tienda)); return favoritosService.getFav(id_Cliente, id_Tienda); }

    @GetMapping("/estadoFav")
    public int getEstado(@RequestParam int id_Cliente, int id_Tienda){
        return favoritosService.estado(id_Cliente, id_Tienda);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public FavoritosTienda save(@RequestBody FavoritosTienda favoritos) {
        System.out.println(favoritos.getId_Tienda());
        System.out.println(favoritos.getId_Cliente());
        return favoritosService.save(favoritos);
    }

    @DeleteMapping("/delete")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@RequestBody FavoritosTienda favoritos) {
        favoritosService.delete(favoritos);
    }
}
