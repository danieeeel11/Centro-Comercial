package usa.david.daavid.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import usa.david.daavid.entity.cliente;
import usa.david.daavid.service.ClienteService;

import java.util.List;

@RestController
@RequestMapping("/api/games")
public class MyController {
    @Autowired
    private ClienteService clienteService;

    @GetMapping("/all")
    public List<cliente> getAll(){
        return clienteService.getAll();
    }


    @PostMapping("/save") //Este metodo se va a ejectuar en el momento en que se haga una peticion a la ruta
    /*
    Instalar postman o cualquier cliente rest
     * Esto son los datos que envia el usuario
     */
    public cliente save(@RequestBody cliente cl){
        return clienteService.save(cl);
    }
    
}
