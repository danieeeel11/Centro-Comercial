package com.cc.centroscomerciales.controller;

import com.cc.centroscomerciales.modelo.CentrosComerciales;
import com.cc.centroscomerciales.service.CentroComericalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/CC")

public class ControladorCC {
    @Autowired
    private CentroComericalService service;

    @GetMapping("/all")
    public List<CentrosComerciales> getAll(){ return service.getAll(); }

    public CentrosComerciales infCC = null;
    @GetMapping("/{id}")
    public CentrosComerciales getInfoCC(@PathVariable("id") int id) {
        if(service.getCC(id).isPresent()){
            infCC = service.getCC(id).get();
            return infCC;
        }
        return service.getCC(id).get();
    }
    @GetMapping("/getId")
    public CentrosComerciales getId() {
        return infCC;
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public CentrosComerciales save(@RequestBody CentrosComerciales c){ return service.save(c); }

    @PostMapping("/saveAll")
    @ResponseStatus(HttpStatus.CREATED)
    public List<CentrosComerciales> saveAll(@RequestBody List<CentrosComerciales> e){return (List<CentrosComerciales>) service.saveAll(e); }

}
