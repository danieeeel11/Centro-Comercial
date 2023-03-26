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

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
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
        if(cc.isEmpty()) {
            cc = service.listar();
        }
        model.addAttribute("cc", cc);
        // Se especifica el nombre del archivo .html
        return "index";
    }
    List<String> listaEnlacesHtml = new ArrayList<>();
    List<String> informacion = new ArrayList<>();
    int cont =1;
    @GetMapping("/listaCC")
    public String obtenerEnlacesHtml(Model model) {
        if(cont==1){
            int des_lat=5;
            int des_top=55;
            int fila = 0;
            int conteo = 0;
            for (CentrosComerciales elemento : cc) {
                String enlaceHtml = "";
                if(conteo%4==0 && conteo!=0){
                    des_lat=5;
                    fila=1;
                }
                if(fila == 0){
                    enlaceHtml =
                            "<a href='/" + elemento.getNombre() +"' class='btn cc' style='left:" + des_lat +"%;background-image:url(\"" + elemento.getLogo() + "\")'> " +
                                    "<p class='txt_btn_cc'>" + elemento.getNombre() + "</p> " +
                                    "</a>";
                    conteo++;
                    des_lat += 23;
                }else if(fila==1){
                    enlaceHtml =
                            "<a href='/" + elemento.getNombre() +"' class='btn cc' style='left:" + des_lat +"%;top:" + des_top + "%;background-image:url(\"" + elemento.getLogo() + "\")'> " +
                                    "<p class='txt_btn_cc'>" + elemento.getNombre() + "</p> " +
                                    "</a>";
                    conteo++;
                    des_lat += 23;
                }
                //<a class='btn cc' style='left:5%; background-image:url("https://www.titanplaza.com/images/share/pi_redes_sociales.jpg")'>
                //           <p class='txt_btn_cc'>Titan plaza</p>
                //       </a>
                //String enlaceHtml = "<a href='" + elemento.getNombre() + "' class='btn cc' style='top:" + des_lat +"px;'> <p class='txt_btn_cc'>" + elemento.getNombre() + "</p> <img class='img_' src='" + elemento.getLogo() + "'></img> </a><br>";
                listaEnlacesHtml.add(enlaceHtml);
                //System.out.println("---------->" + enlaceHtml);
            }
            cont--;
        }
        model.addAttribute("enlacesHtml", listaEnlacesHtml);

        return "ListaCC";
    }

    @GetMapping("/{nombre}")
    public String getCentroComercial(@PathVariable String nombre, Model model) {
        /*for (int i = 0; i < informacion.size(); i++) {
            System.out.println(informacion.get(i));
        }*/
        informacion.clear();
        for (CentrosComerciales elemento : cc) {
            //System.out.println(nombre + " = "+elemento.getNombre());
            //if (nombre.equals(elemento.getNombre())) {
            if (elemento.getNombre().contains(nombre)) {
                //System.out.println("dentro");
                String info = "<div align='center'>" +
                        "<h1>" + elemento.getNombre() + "</h1>" +
                        "<img src='" + elemento.getLogo() + "' alt='logo'>" +
                        "<h2> DESCRIPCION:</h2>" +
                        "<h3>" + elemento.getDescripcion() + "</h3><br>" +
                        "<h2> HORARIO:</h2>" +
                        "<h3>" + elemento.getHorario() + " </h3><br>" +
                        "<h2> DIRECCION:</h2>" +
                        "<h3>" + elemento.getDireccion() + "</h3><br>" +
                        "</div>";
                informacion.add(info);
            }
            /*else {
                return "infoCC";
            }*/
            model.addAttribute("informacion", informacion);
        }
        return "infoCC";
    }
    @GetMapping("/menu")
    public String menu(Model model) {
        return "Menu";
    }
    @GetMapping("/listaCCfav")
    public String obtenerCCfav(Model model) {
        return "ListaCCfav";
    }
    @GetMapping("/loc")
    public String obtenerLoc(Model model) {
        File archivo = null;
        FileReader fr = null;
        BufferedReader br = null;
        try {
            archivo = new File ("\\resources\\templates\\ListaCC.html");
            fr = new FileReader (archivo);
            br = new BufferedReader(fr);

            // Lectura del fichero
            String linea;
            while((linea=br.readLine())!=null)
                System.out.println(linea);
        }
        catch(Exception e){
            e.printStackTrace();
        }finally{
            // En el finally cerramos el fichero, para asegurarnos
            // que se cierra tanto si todo va bien como si salta
            // una excepcion.
            try{
                if( null != fr ){
                    fr.close();
                }
            }catch (Exception e2){
                e2.printStackTrace();
            }
        }
        return "";
    }
}
