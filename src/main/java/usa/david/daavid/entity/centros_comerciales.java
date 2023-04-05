package usa.david.daavid.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
// import lombok.NonNull;
@Entity
@Data
public class centros_comerciales {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    //@NonNull
    private String logo;

    //@NonNull
    private String nombre;

    //@NonNull
    private String descripcion;
    //@NonNull
    private String horario;
    //@NonNull
    private String direccion;
    private String foto=null;
    private String vinculo=null;
    private String cordenadas=null;
}
