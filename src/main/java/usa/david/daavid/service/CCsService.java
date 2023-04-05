package usa.david.daavid.service;
import usa.david.daavid.entity.centrosComerciales;
import usa.david.daavid.repository.CCsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class CCsService {
    @Autowired
    private CCsRepository cCsRepository;

    public List<centrosComerciales> getAll(){
        return cCsRepository.findAll();
    }

    public centrosComerciales save(centrosComerciales cl){
        return cCsRepository.save(cl);
    }

    public centrosComerciales get(Integer id){
        Optional<centrosComerciales> cl=cCsRepository.findById(id);
        if(cl.isPresent()){
            return cl.get();
        }else{
            centrosComerciales rta = new centrosComerciales();
            return rta;
        }

    }
}
