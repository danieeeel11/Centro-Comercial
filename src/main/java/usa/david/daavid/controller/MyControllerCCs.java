package usa.david.daavid.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import usa.david.daavid.entity.centros_comerciales;
import usa.david.daavid.service.CCsService;


import java.util.List;

@RestController
@RequestMapping("/api/centrocomerical")
public class MyControllerCCs {

    @Autowired
    private CCsService cCsService;

    @GetMapping("/ccall")
    public List<centros_comerciales> ccgetAll(){
        return cCsService.getAll();
    }

    

    @PostMapping("/ccsave")
    public centros_comerciales ccsave(@RequestBody centros_comerciales cc){
        return cCsService.save(cc);
    }
}
