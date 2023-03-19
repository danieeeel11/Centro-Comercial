package com.sinfloo.centrocomercial.interfaces;

import org.springframework.data.repository.CrudRepository;
import com.sinfloo.centrocomercial.modelo.CentrosComerciales;
import org.springframework.stereotype.Repository;

@Repository
public interface ICentrosComerciales extends CrudRepository<CentrosComerciales, Integer> {

}
