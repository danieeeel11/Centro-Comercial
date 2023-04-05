package usa.david.daavid.repository;
import usa.david.daavid.entity.centrosComerciales;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public class CCsRepository {
    @Autowired
    private CcsCrudRepository crudRepository;

    /*
     * Método que guarda un cliente y lo retorna
     */
    public centrosComerciales save(centrosComerciales cl) {
        return  crudRepository.save(cl);
    }

    public <S extends centrosComerciales> List<S> saveAll(Iterable<S> entidades) {
        return (List<S>) crudRepository.saveAll(entidades);
    }

    /*
     * Método que busca un elemento de los clientes que hay por medio del id
     * @return se retorna el cliente
     */
    public Optional<centrosComerciales> findById(Integer id) {
        return crudRepository.findById(id);
    }

    public boolean existsById(Integer id) {
        return crudRepository.existsById(id);
    }

    /*
     * Método que busca todos los clientes
     * @return lista de los clientes o usuarios 
     */
    public List<centrosComerciales> findAll() {
        return (List<centrosComerciales>) crudRepository.findAll();
    }

    public long count() {
        return crudRepository.count();
    }

    /*
     * Se elimina un cliente por el id
     */
    public void deleteById(Integer id) {
        crudRepository.deleteById(id);
    }

    public void delete(centrosComerciales entity) {
        crudRepository.delete(entity);
    }

    public List<centrosComerciales> findAllById(Iterable<Integer> ids) {
        return (List<centrosComerciales>) crudRepository.findAllById(ids);
    }

    public void deleteAll(List<centrosComerciales> entities) {
        crudRepository.deleteAll(entities);
    }

    public void deleteAll() {
        crudRepository.deleteAll();
    }

    public void deleteAllById(List<Integer> ids) {
        List<centrosComerciales> entidades = this.findAllById(ids);
        crudRepository.deleteAll(entidades);
    }
}
