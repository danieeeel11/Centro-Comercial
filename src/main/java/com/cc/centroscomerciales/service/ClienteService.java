package com.cc.centroscomerciales.service;

import com.cc.centroscomerciales.modelo.Cliente;
import com.cc.centroscomerciales.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {
    @Autowired
    private ClienteRepository clientRepository;


    public List<Cliente> getAll(){
        return clientRepository.getAll();
    }

    public Optional<Cliente> getClient(int clientId) {
        return clientRepository.getClient(clientId);
    }

    public List<Cliente> getUserClient(String user) {
        return clientRepository.getUserClient(user);
    }

    public Cliente save(Cliente client){
        if(client.getId()==null){
            return clientRepository.save(client);
        }else{
            Optional<Cliente> e= clientRepository.getClient(client.getId());
            if(!e.isPresent()){
                return clientRepository.save(client);
            }else{
                return client;
            }
        }
    }


    public Cliente update(Cliente client){
        if(client.getId()!=null){
            Optional<Cliente> e= clientRepository.getClient(client.getId());
            if(e.isPresent()){
                if(client.getNombre()!=null) {
                    e.get().setNombre(client.getNombre());
                }
                clientRepository.save(e.get());
                return e.get();
            }else{
                return client;
            }
        }else{
            return client;
        }
    }

    public boolean deleteClient(int clientId) {
        Boolean aBoolean = getClient(clientId).map(client -> {
            clientRepository.delete(client);
            return true;
        }).orElse(false);
        return aBoolean;
    }

    public Cliente getClient(String user, String password) {
        return clientRepository.getUser(user, password);
    }
}