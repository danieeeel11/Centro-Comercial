package com.cc.centroscomerciales.interfaces;

import com.cc.centroscomerciales.modelo.Tiendas;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
//Clase que se conecta con la Base de Datos
public interface ITiendas extends CrudRepository<Tiendas, Integer> {
}
