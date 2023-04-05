package usa.david.daavid.service;

import usa.david.daavid.entity.cliente;
import usa.david.daavid.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {
    @Autowired
    private ClienteRepository clienteRepository;

    public List<cliente> getAll(){
        return clienteRepository.findAll();
    }

    public cliente save(cliente cl){
        return clienteRepository.save(cl);
    }

    public cliente get(Long id){
        Optional<cliente> cl=clienteRepository.findById(id);
        if(cl.isPresent()){
            return cl.get();
        }else{
            cliente rta=new cliente();
            return rta;
        }

    }
}
