package com.sinfloo.centrocomercial.interfaces;

import com.sinfloo.centrocomercial.modelo.Cliente;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface IClientes extends CrudRepository<Cliente,Integer> {
    @Query("SELECT c FROM Cliente AS c WHERE c.usuario =:user AND c.contrasenia =:password")
    public Cliente getUser(String user, String password);

    @Query("SELECT c FROM Cliente AS c WHERE c.usuario LIKE :user")
    public List<Cliente> getUserClient(String user);
}
