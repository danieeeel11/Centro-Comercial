package com.sinfloo.centrocomercial.controller;

import com.sinfloo.centrocomercial.interfaceService.ICentroComercialService;
import com.sinfloo.centrocomercial.modelo.CentrosComerciales;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping
public class Controlador {

    @Autowired
    private ICentroComercialService service;

    @GetMapping("/listar")
    public String Listar(Model model){
        List<CentrosComerciales> cc = service.listar();
        model.addAttribute("cc", cc);
        // Se especifica el nombre del archivo .html
        return "index";
    }
}
