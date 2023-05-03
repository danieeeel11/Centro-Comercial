package com.cc.centroscomerciales.repository;

import com.cc.centroscomerciales.interfaces.ITiendas;
import com.cc.centroscomerciales.modelo.Tiendas;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class TiendasRepository {
    @Autowired
    private ITiendas tiendasCrudRepository;

    public List<Tiendas> getAll(){ return (List<Tiendas>) tiendasCrudRepository.findAll(); }

    public Tiendas save(Tiendas c){ return tiendasCrudRepository.save(c); }

    public List<Tiendas> saveAll(List<Tiendas> equipos){ return (List<Tiendas>) tiendasCrudRepository.saveAll(equipos);}

    public void delete(Tiendas c){ tiendasCrudRepository.delete(c);}

    public Optional<Tiendas> getTiendas(int id){
        return tiendasCrudRepository.findById(id);
    }
}
