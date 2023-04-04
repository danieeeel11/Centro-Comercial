package com.sinfloo.centrocomercial.service;

import com.sinfloo.centrocomercial.interfaceService.INovedadesService;
import com.sinfloo.centrocomercial.interfaces.INovedades;
import com.sinfloo.centrocomercial.modelo.Novedades;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NovedadService implements INovedadesService {
    @Autowired
    private INovedades data;

    @Override
    public List<Novedades> listar() {
        return (List<Novedades>)data.findAll();
    }

    @Override
    public Optional<Novedades> listarId(int id) {
        //return Optional.empty();
        return data.findById(id);
    }

    @Override
    public int save(Novedades nvd) {
        return 0;
    }

    @Override
    public void delete(int id) {

    }
}
