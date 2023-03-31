package com.sinfloo.centrocomercial.controller;
import com.sinfloo.centrocomercial.repository.ICentroComercialService;
import com.sinfloo.centrocomercial.modelo.CentrosComerciales;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/CC")
public class ControladorCC {
    @Autowired
    private ICentroComercialService service;

    @GetMapping("/all")
    public List<CentrosComerciales> getAll(){ return service.listar(); }

    @GetMapping("/{id}")
    public Optional<CentrosComerciales> getEquipo(@PathVariable("id") int equipoId) {
        return service.getCentroComercial(equipoId);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public CentrosComerciales save(@RequestBody CentrosComerciales c){ return service.save(c); }


}
