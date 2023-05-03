package com.cc.centroscomerciales.controller;

import com.cc.centroscomerciales.modelo.Favoritos;
import com.cc.centroscomerciales.service.FavoritosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/Favoritos")
public class ControladorFavoritos {
    @Autowired
    private FavoritosService favoritosService;

    @GetMapping("/all")
    public List<Favoritos> getFavoritos(){
        return favoritosService.getAll();
    }

    /**
     * Obtener lista de favoritos de un usuario
     * @param id_Cliente
     * @return
     */
    @GetMapping("/user")
    public List<Favoritos> getCLienteFavs(@RequestParam int id_Cliente){ return favoritosService.getClientsFav(id_Cliente); }

    @GetMapping("/fav")
    public Favoritos getFav(@RequestParam int id_Cliente, int id_CC){ System.out.println(favoritosService.getFav(id_Cliente, id_CC)); return favoritosService.getFav(id_Cliente, id_CC); }

    @GetMapping("/estadoFav")
    public int getEstado(@RequestParam int id_Cliente, int id_CC){
        return favoritosService.estado(id_Cliente, id_CC);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Favoritos save(@RequestBody Favoritos favoritos) {
        return favoritosService.save(favoritos);
    }

    @DeleteMapping("/delete")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@RequestBody Favoritos favoritos) {
        favoritosService.delete(favoritos);
    }

    /*@GetMapping("obtener/{user}")
    public List<Favoritos> getUserClient(@PathVariable("user") String userClient) {
        return favoritosService.getUserFavorito("%"+userClient+"%");
    }*/
    /*@PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Favoritos update(@RequestBody Favoritos favoritos) {
        return favoritosService.update(favoritos);
    }*/
    /*@GetMapping("/{id}")
    public Optional<Favoritos> getFavorito(@PathVariable("id") int favId) {
        return favoritosService.getFavorito(favId);
    }*/

    /*@DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int clientId) {
        return favoritosService.deleteFavorito(clientId);
    }*/
}