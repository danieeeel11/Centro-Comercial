package com.cc.centroscomerciales.repository;

import com.cc.centroscomerciales.interfaces.ICentrosComerciales;
import com.cc.centroscomerciales.modelo.CentrosComerciales;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class CentroComercialRepository {
    @Autowired
    private ICentrosComerciales ccCrudRepository;

    public List<CentrosComerciales> getAll(){ return (List<CentrosComerciales>) ccCrudRepository.findAll(); }

    public CentrosComerciales save(CentrosComerciales c){ return ccCrudRepository.save(c); }

    public List<CentrosComerciales> saveAll(List<CentrosComerciales> equipos){ return (List<CentrosComerciales>) ccCrudRepository.saveAll(equipos);}

    public void delete(CentrosComerciales c){ ccCrudRepository.delete(c);}

    public Optional<CentrosComerciales> getCC(int id){
        return ccCrudRepository.findById(id);
    }
}
