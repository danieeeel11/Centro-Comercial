package com.cc.centroscomerciales.controller;

import com.cc.centroscomerciales.modelo.Novedades;
import com.cc.centroscomerciales.service.NovedadesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/Novedades")
public class ControladorNovedades {
    @Autowired
    private NovedadesService novedadesService;

    @GetMapping("/all")
    public List<Novedades> getNovedades(){
        return novedadesService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Novedades> getNovedades(@PathVariable("id") int novID) {
        return novedadesService.getNovedad(novID);
    }
}