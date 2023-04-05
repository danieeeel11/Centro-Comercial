package usa.david.daavid.service;
import usa.david.daavid.entity.centros_comerciales;
import usa.david.daavid.repository.CCsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class CCsService {
    @Autowired
    private CCsRepository cCsRepository;

    public List<centros_comerciales> getAll(){
        return cCsRepository.findAll();
    }

    public centros_comerciales save(centros_comerciales cl){
        return cCsRepository.save(cl);
    }

    public centros_comerciales get(Integer id){
        Optional<centros_comerciales> cl=cCsRepository.findById(id);
        if(cl.isPresent()){
            return cl.get();
        }else{
            centros_comerciales rta = new centros_comerciales();
            return rta;
        }

    }
}
