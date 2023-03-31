package com.sinfloo.centrocomercial.repository;

import com.sinfloo.centrocomercial.modelo.CentrosComerciales;

import java.util.List;
import java.util.Optional;

public interface ICentroComercialService {
    public List<CentrosComerciales> listar();
    public Optional<CentrosComerciales> getCentroComercial(int id);
    public CentrosComerciales save(CentrosComerciales c);
}
