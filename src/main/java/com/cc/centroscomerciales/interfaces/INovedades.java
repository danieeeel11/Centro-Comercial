package com.cc.centroscomerciales.interfaces;

import com.cc.centroscomerciales.modelo.CentrosComerciales;
import com.cc.centroscomerciales.modelo.Novedades;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface INovedades extends CrudRepository<Novedades, Integer> {
}
