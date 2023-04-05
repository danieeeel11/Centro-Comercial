package usa.david.daavid.repository;
import usa.david.daavid.entity.cliente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class ClienteRepository{

    @Autowired
    private ClienteCrudRepository crudRepository;

    /*
     * Método que guarda un cliente y lo retorna
     */
    public cliente save(cliente cl) {
        return  crudRepository.save(cl);
    }

    public <S extends cliente> List<S> saveAll(Iterable<S> entidades) {
        return (List<S>) crudRepository.saveAll(entidades);
    }

    /*
     * Método que busca un elemento de los clientes que hay por medio del id
     * @return se retorna el cliente
     */
    public Optional<cliente> findById(Long id) {
        return crudRepository.findById(id);
    }

    public boolean existsById(Long id) {
        return crudRepository.existsById(id);
    }

    /*
     * Método que busca todos los clientes
     * @return lista de los clientes o usuarios 
     */
    public List<cliente> findAll() {
        return (List<cliente>) crudRepository.findAll();
    }

    public long count() {
        return crudRepository.count();
    }

    /*
     * Se elimina un cliente por el id
     */
    public void deleteById(Long id) {
        crudRepository.deleteById(id);
    }

    public void delete(cliente entity) {
        crudRepository.delete(entity);
    }

    public List<cliente> findAllById(Iterable<Long> ids) {
        return (List<cliente>) crudRepository.findAllById(ids);
    }

    public void deleteAll(List<cliente> entities) {
        crudRepository.deleteAll(entities);
    }

    public void deleteAll() {
        crudRepository.deleteAll();
    }

    public void deleteAllById(List<Long> ids) {
        List<cliente> entidades = this.findAllById(ids);
        crudRepository.deleteAll(entidades);
    }
}
