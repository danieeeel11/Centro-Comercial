package com.sinfloo.centrocomercial.interfaces;

import com.sinfloo.centrocomercial.modelo.Novedades;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface INovedades extends CrudRepository<Novedades, Integer> {
}
