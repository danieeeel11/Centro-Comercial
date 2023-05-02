package com.cc.centroscomerciales.repository;

import com.cc.centroscomerciales.modelo.Novedades;
import com.cc.centroscomerciales.interfaces.INovedades;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public class NovedadesRepository {
    @Autowired
    private INovedades NovedadesCrudRepository;
    public List<Novedades> getAll(){
        return (List<Novedades>) NovedadesCrudRepository.findAll();
    }
    public Optional<Novedades> getNovedad(int id){
        return NovedadesCrudRepository.findById(id);
    }

    public Novedades save(Novedades novedades){
        return NovedadesCrudRepository.save(novedades);
    }
    public void delete(Novedades novedades){
        NovedadesCrudRepository.delete(novedades);
    }
}
