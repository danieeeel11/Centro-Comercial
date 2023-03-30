package com.sinfloo.centrocomercial.interfaceService;

import com.sinfloo.centrocomercial.modelo.CentrosComerciales;

import java.util.List;
import java.util.Optional;

public interface ICentroComercialService {
    public List<CentrosComerciales> listar();
    public Optional<CentrosComerciales> listarId(int id);
    public int save(CentrosComerciales cc);
    public void delete(int id);
}
