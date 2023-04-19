package com.cc.centroscomerciales.controller;

import com.cc.centroscomerciales.modelo.Cliente;
import com.cc.centroscomerciales.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/Cliente")
public class ControladorCliente {
    @Autowired
    private ClienteService clientService;

    @GetMapping("/all")
    public List<Cliente> getClients(){
        return clientService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Cliente> getClient(@PathVariable("id") int clientId) {
        return clientService.getClient(clientId);
    }

    @GetMapping("ingresar/{user}/{password}")
    public Cliente getClient(@PathVariable("user") String userClient, @PathVariable("password") String userPassword) {
        return clientService.getClient(userClient, userPassword);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Cliente save(@RequestBody Cliente client) {
        return clientService.save(client);
    }

    @GetMapping("obtener/{user}")
    public List<Cliente> getUserClient(@PathVariable("user") String userClient) {
        return clientService.getUserClient("%"+userClient+"%");
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Cliente update(@RequestBody Cliente client) {
        return clientService.update(client);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int clientId) {
        return clientService.deleteClient(clientId);
    }
}
