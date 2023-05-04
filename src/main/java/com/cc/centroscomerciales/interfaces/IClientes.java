package com.cc.centroscomerciales.interfaces;

import com.cc.centroscomerciales.modelo.Cliente;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface IClientes extends CrudRepository<Cliente,Integer> {
    @Query("SELECT c FROM Cliente AS c WHERE c.usuario =:user AND c.contrasenia =:password")
    public Cliente getUserr(String user, String password);

    @Query("SELECT c FROM Cliente AS c WHERE c.usuario LIKE :user")
    public List<Cliente> getUserClient(String user);

    @Query("SELECT c FROM Cliente AS c WHERE c.usuario LIKE :user")
    public Optional<Cliente> getUser(String user);
}
