package com.cc.centroscomerciales.repository;

import com.cc.centroscomerciales.modelo.novedades;
import com.cc.centroscomerciales.interfaces.INovedades;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public class NovedadesRepository {
    @Autowired
    private INovedades NovedadesCrudRepository;
    public List<novedades> getAll(){
        return (List<novedades>) NovedadesCrudRepository.findAll();
    }
    public Optional<novedades> getNovedad(int id){
        return NovedadesCrudRepository.findById(id);
    }

    public novedades save(novedades novedades){
        return NovedadesCrudRepository.save(novedades);
    }
    public void delete(novedades novedades){
        NovedadesCrudRepository.delete(novedades);
    }
}
