package com.cc.centroscomerciales.service;

import com.cc.centroscomerciales.repository.TiendasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.cc.centroscomerciales.modelo.Tiendas;

import java.util.List;
import java.util.Optional;

@Service
public class TiendasService {
    @Autowired
    private TiendasRepository tiendasRepository;
    public List<Tiendas> getAll(){ return tiendasRepository.getAll(); }

    public Optional<Tiendas> getTiendas(int id){ return tiendasRepository.getTiendas(id); }

    public Tiendas save(Tiendas c){
        if(c.getId()==null){
            return tiendasRepository.save(c);
        }else {
            Optional<Tiendas> e = tiendasRepository.getTiendas(c.getId());
            if(e.isPresent()){
                return c;
            }else {
                return tiendasRepository.save(c);
            }
        }
    }

    public List<Tiendas> saveAll(List<Tiendas> cc){
        return (List<Tiendas>) tiendasRepository.saveAll(cc);
    }

    public Tiendas update(Tiendas cc){
        if(cc.getId()!=null){
            Optional<Tiendas> e = tiendasRepository.getTiendas(cc.getId());
            if (e.isPresent()){
                if (cc.getNombre()!=null){
                    e.get().setNombre(cc.getNombre());
                }
                tiendasRepository.save(e.get());
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
        Optional<Tiendas> e = tiendasRepository.getTiendas(id);
        if(e.isPresent()){
            tiendasRepository.delete(e.get());
            flag = true;
        }
        return flag;
    }
}
