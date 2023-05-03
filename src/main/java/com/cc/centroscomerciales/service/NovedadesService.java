package com.cc.centroscomerciales.service;

import com.cc.centroscomerciales.modelo.Novedades;
import com.cc.centroscomerciales.repository.NovedadesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class NovedadesService {
    @Autowired
    private NovedadesRepository novedadesRepository;

    public List<Novedades> getAll(){
        return novedadesRepository.getAll();
    }
    public Optional<Novedades> getNovedad(int clientId) {
        return novedadesRepository.getNovedad(clientId);
    }
}
