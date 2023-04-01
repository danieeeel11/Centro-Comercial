package com.sinfloo.centrocomercial.repository;

import com.sinfloo.centrocomercial.interfaces.IClientes;
import com.sinfloo.centrocomercial.modelo.Cliente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class ClienteRepository {
    @Autowired
    private IClientes clientCrudRepository;
    public List<Cliente> getAll(){
        return (List<Cliente>) clientCrudRepository.findAll();
    }
    public List<Cliente> getUserClient(String user){
        return clientCrudRepository.getUserClient(user);
    }
    public Optional<Cliente> getClient(int id){
        return clientCrudRepository.findById(id);
    }
    public Cliente save(Cliente client){
        return clientCrudRepository.save(client);
    }
    public void delete(Cliente client){
        clientCrudRepository.delete(client);
    }

    public Cliente getUser(String user, String password){
        return clientCrudRepository.getUser(user, password);
    }
}
