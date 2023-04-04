package com.sinfloo.centrocomercial.interfaceService;

import com.sinfloo.centrocomercial.modelo.Novedades;

import java.util.List;
import java.util.Optional;

public interface INovedadesService {
    public List<Novedades> listar();
    public Optional<Novedades> listarId(int id);
    public int save(Novedades nvd);
    public void delete(int id);
}
