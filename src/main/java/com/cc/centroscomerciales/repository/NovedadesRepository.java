package com.cc.centroscomerciales.repository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.cc.centroscomerciales.interfaces.INovedades;
import com.cc.centroscomerciales.modelo.novedades;
import java.util.List;
import java.util.Optional;

@Repository
public class NovedadesRepository {
    @Autowired
    private INovedades novedadR;

    public List<novedades> getAll(){
        return (List<novedades>) novedadR.findAll();
    }

    public List<novedades> getAllCCNovedad(int id){
        return novedadR.getAllCCNovedad(id);
    }

    public Optional<novedades> getNovedad(int id){
        return novedadR.findById(id);
    }

    public novedades save(novedades nov){
        return novedadR.save(nov);
    }

    public void delete(novedades nov){
        novedadR.delete(nov);
    }
}