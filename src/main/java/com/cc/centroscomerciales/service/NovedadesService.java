package com.cc.centroscomerciales.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import com.cc.centroscomerciales.modelo.novedades;

import com.cc.centroscomerciales.repository.NovedadesRepository;

@Service
public class NovedadesService {
    @Autowired
    private NovedadesRepository novedadesRepository;

    public List<novedades> getAll(){
        return novedadesRepository.getAll();
    }

    public List<novedades> getAllCCNovedad(int id){
        return novedadesRepository.getAllCCNovedad(id);
    }
    
    public Optional<novedades> getNovedad(int id){
        return novedadesRepository.getNovedad(id);   
    }

    public novedades save(novedades novedades){
        return novedadesRepository.save(novedades);
    }

    public void delete(novedades novedades){
        novedadesRepository.delete(novedades);
    }


}
