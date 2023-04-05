package usa.david.daavid.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import usa.david.daavid.service.ClienteService;
import usa.david.daavid.entity.cliente;
@RestController
@RequestMapping("/api/centrocomerical")
public class MyControllerCLiente {
    
    @Autowired
    private ClienteService clienteService;

    @GetMapping("/clall")
    public List<cliente> clgetAll(){
        return clienteService.getAll();
    }
    
    
    @PostMapping("/clsave") //Este metodo se va a ejectuar en el momento en que se haga una peticion a la ruta
    /*
    Instalar postman o cualquier cliente rest
     * Esto son los datos que envia el usuario
     */
    public cliente clsave(@RequestBody cliente cl){
        return clienteService.save(cl);
    }
    
}
