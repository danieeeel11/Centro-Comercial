package com.sinfloo.centrocomercial.service;

import com.sinfloo.centrocomercial.interfaces.ICentrosComerciales;
import com.sinfloo.centrocomercial.modelo.CentrosComerciales;
import com.sinfloo.centrocomercial.repository.CentroComercialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CentroComericalService{
    @Autowired
    private CentroComercialRepository ccRepository;

    public List<CentrosComerciales> getAll(){ return ccRepository.getAll(); }

    public Optional<CentrosComerciales> getCC(int id){ return ccRepository.getCC(id); }

    public CentrosComerciales save(CentrosComerciales c){
        if(c.getId()==null){
            return ccRepository.save(c);
        }else {
            Optional<CentrosComerciales> e = ccRepository.getCC(c.getId());
            if(e.isPresent()){
                return c;
            }else {
                return ccRepository.save(c);
            }
        }
    }

    public List<CentrosComerciales> saveAll(List<CentrosComerciales> cc){
        return (List<CentrosComerciales>) ccRepository.saveAll(cc);
    }

    public CentrosComerciales update(CentrosComerciales cc){
        if(cc.getId()!=null){
            Optional<CentrosComerciales> e = ccRepository.getCC(cc.getId());
            if (e.isPresent()){
                if (cc.getNombre()!=null){
                    e.get().setNombre(cc.getNombre());
                }
                ccRepository.save(e.get());
                return e.get();
            }else {
                return cc;
            }
        }else {
            return cc;
        }
    }

    public boolean delete(int id){
        boolean flag=false;
        Optional<CentrosComerciales> e = ccRepository.getCC(id);
        if(e.isPresent()){
            ccRepository.delete(e.get());
            flag = true;
        }
        return flag;
    }

}
