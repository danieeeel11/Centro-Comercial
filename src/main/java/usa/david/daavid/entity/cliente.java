package usa.david.daavid.entity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
@Entity
@Data
public class cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String correo=null;
    private String nombre=null;
    private String telefono=null;
    private int cc_favorito=0;
    private String password=null;
    private String placa_vehiculo=null;
}
