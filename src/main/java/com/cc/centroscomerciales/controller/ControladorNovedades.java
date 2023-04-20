package com.cc.centroscomerciales.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Optional;

import com.cc.centroscomerciales.modelo.novedades;
import com.cc.centroscomerciales.service.NovedadesService;

@RestController
@RequestMapping("/api/novedades")
public class ControladorNovedades {
    @Autowired
    private NovedadesService novedadesService;

    @GetMapping("/all")
    public List<novedades> getAll(){
        return novedadesService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<novedades> getNovedad(@PathVariable("id") int id){
        return novedadesService.getNovedad(id);
    }

    @GetMapping("/{id_cc}")
    public List<novedades> getAllCCNovedad(@PathVariable("id_cc") int id){
        return novedadesService.getAllCCNovedad(id);
    }
}
