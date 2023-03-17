package com.sinfloo.centrocomercial.controller;

import com.sinfloo.centrocomercial.interfaceService.ICentroComercialService;
import com.sinfloo.centrocomercial.modelo.CentrosComerciales;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping
public class Controlador {
    List<CentrosComerciales> cc = new ArrayList<>();
    @Autowired
    private ICentroComercialService service;

    @GetMapping("/principal")
    public String Listar(Model model) {
        cc = service.listar();
        model.addAttribute("cc", cc);
        // Se especifica el nombre del archivo .html
        return "index";
    }
    List<String> listaEnlacesHtml = new ArrayList<>();
    @GetMapping("/listaCC")
    public String obtenerEnlacesHtml(Model model) {
        for (CentrosComerciales elemento : cc) {
            String enlaceHtml = "<a href='" + elemento.getNombre() + "'>" + elemento.getNombre() + "</a><br>";
            listaEnlacesHtml.add(enlaceHtml);
        }
        model.addAttribute("enlacesHtml", listaEnlacesHtml);
        return "ListaCC";
    }

    @GetMapping("/{nombre}")
    public String getCentroComercial(@PathVariable String nombre, Model model) {
        for (CentrosComerciales elemento : cc) {
            if (nombre.equals(elemento.getNombre())){
                model.addAttribute("info", elemento);
                return "infoCC";
            }else{
                return "ListaCC";
            }
        }return "ListaCC";

    }





}
