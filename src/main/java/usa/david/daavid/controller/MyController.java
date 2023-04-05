package usa.david.daavid.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import usa.david.daavid.entity.centros_comerciales;
import usa.david.daavid.entity.cliente;
import usa.david.daavid.service.CCsService;
import usa.david.daavid.service.ClienteService;

import java.util.List;

@RestController
@RequestMapping("/api/centrocomerical")
public class MyController {
    @Autowired
    private ClienteService clienteService;

    @Autowired
    private CCsService cCsService;

    @GetMapping("/ccall")
    public List<centros_comerciales> ccgetAll(){
        return cCsService.getAll();
    }

    @GetMapping("/clall")
    public List<cliente> clgetAll(){
        return clienteService.getAll();
    }

    @PostMapping("/ccsave")
    public centros_comerciales ccsave(@RequestBody centros_comerciales cc){
        return cCsService.save(cc);
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
