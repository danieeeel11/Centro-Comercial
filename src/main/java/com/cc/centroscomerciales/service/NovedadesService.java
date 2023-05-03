package com.cc.centroscomerciales.service;

import com.cc.centroscomerciales.modelo.novedades;
import com.cc.centroscomerciales.repository.NovedadesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class NovedadesService {
    @Autowired
    private NovedadesRepository novedadesRepository;

    public List<novedades> getAll(){
        return novedadesRepository.getAll();
    }
    public Optional<novedades> getNovedad(int clientId) {
        return novedadesRepository.getNovedad(clientId);
    }
}
