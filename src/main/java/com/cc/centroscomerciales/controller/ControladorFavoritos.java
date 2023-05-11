package com.cc.centroscomerciales.controller;

import com.cc.centroscomerciales.modelo.Favoritos;
import com.cc.centroscomerciales.service.FavoritosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/Favoritos")
public class ControladorFavoritos {
    @Autowired
    private FavoritosService favoritosService;

    @GetMapping("/all")
    public List<Favoritos> getFavoritos(){
        return favoritosService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Favoritos> getFavorito(@PathVariable("id") int favId) {
        return favoritosService.getFavorito(favId);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Favoritos save(@RequestBody Favoritos favoritos) {
        return favoritosService.save(favoritos);
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

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int clientId) {
        return favoritosService.deleteFavorito(clientId);
    }
}