package usa.david.daavid.repository;
import usa.david.daavid.entity.centros_comerciales;
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
    public centros_comerciales save(centros_comerciales cl) {
        return  crudRepository.save(cl);
    }

    public <S extends centros_comerciales> List<S> saveAll(Iterable<S> entidades) {
        return (List<S>) crudRepository.saveAll(entidades);
    }

    /*
     * Método que busca un elemento de los clientes que hay por medio del id
     * @return se retorna el cliente
     */
    public Optional<centros_comerciales> findById(Integer id) {
        return crudRepository.findById(id);
    }

    public boolean existsById(Integer id) {
        return crudRepository.existsById(id);
    }

    /*
     * Método que busca todos los clientes
     * @return lista de los clientes o usuarios 
     */
    public List<centros_comerciales> findAll() {
        return (List<centros_comerciales>) crudRepository.findAll();
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

    public void delete(centros_comerciales entity) {
        crudRepository.delete(entity);
    }

    public List<centros_comerciales> findAllById(Iterable<Integer> ids) {
        return (List<centros_comerciales>) crudRepository.findAllById(ids);
    }

    public void deleteAll(List<centros_comerciales> entities) {
        crudRepository.deleteAll(entities);
    }

    public void deleteAll() {
        crudRepository.deleteAll();
    }

    public void deleteAllById(List<Integer> ids) {
        List<centros_comerciales> entidades = this.findAllById(ids);
        crudRepository.deleteAll(entidades);
    }
}
