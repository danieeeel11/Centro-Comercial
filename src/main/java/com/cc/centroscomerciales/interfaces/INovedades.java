package com.cc.centroscomerciales.interfaces;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.cc.centroscomerciales.modelo.novedades;
import java.util.List;

public interface INovedades extends CrudRepository<novedades, Integer> {
    @Query("select c from novedades as c where c.id_cc =:id")
    public List<novedades> getAllCCNovedad(int id);
}