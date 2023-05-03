package com.cc.centroscomerciales.interfaces;

import com.cc.centroscomerciales.modelo.novedades;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface INovedades extends CrudRepository<novedades, Integer> {
}
