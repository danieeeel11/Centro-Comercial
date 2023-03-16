package com.sinfloo.centrocomercial.service;

import com.sinfloo.centrocomercial.interfaceService.ICentroComercialService;
import com.sinfloo.centrocomercial.interfaces.ICentrosComerciales;
import com.sinfloo.centrocomercial.modelo.CentrosComerciales;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CentroComericalService implements ICentroComercialService {
    @Autowired
    private ICentrosComerciales data;

    @Override
    public List<CentrosComerciales> listar() {
        return (List<CentrosComerciales>)data.findAll();
    }

    @Override
    public Optional<CentrosComerciales> listarId(int id) {
        return null;
    }

    @Override
    public int save(CentrosComerciales c) {
        return 0;
    }

    @Override
    public void delete(int id) {

    }
}
