package com.cc.centroscomerciales.controller;
import com.cc.centroscomerciales.modelo.novedades;
import com.cc.centroscomerciales.service.NovedadesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/Novedades")
public class ControladorNovedades {
    @Autowired
    private NovedadesService novedadesService;

    @GetMapping("/all")
    public List<novedades> getNovedades(){
        return novedadesService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<novedades> getNovedades(@PathVariable("id") int novID) {
        return novedadesService.getNovedad(novID);
    }

    
}
