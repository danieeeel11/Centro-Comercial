package com.cc.centroscomerciales.controller;

import com.cc.centroscomerciales.modelo.Tiendas;
import com.cc.centroscomerciales.service.TiendasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/Tiendas")
public class ControladorTiendas {
    @Autowired
    private TiendasService service;
    @GetMapping("/all")
    public List<Tiendas> getAll(){ return service.getAll(); }

    @GetMapping("/{id}")
    public Optional<Tiendas> getTiendas(@PathVariable("id") int idTiendas) {
        return service.getTiendas(idTiendas);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Tiendas save(@RequestBody Tiendas c){ return service.save(c); }

    @PostMapping("/saveAll")
    @ResponseStatus(HttpStatus.CREATED)
    public List<Tiendas> saveAll(@RequestBody List<Tiendas> e){return (List<Tiendas>) service.saveAll(e); }
}
