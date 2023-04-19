package com.cc.centroscomerciales.interfaces;

import com.cc.centroscomerciales.modelo.CentrosComerciales;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICentrosComerciales extends CrudRepository<CentrosComerciales, Integer> {
}
