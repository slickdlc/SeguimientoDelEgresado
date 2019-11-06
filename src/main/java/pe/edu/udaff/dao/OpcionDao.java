package pe.edu.udaff.dao;

import java.util.List;

import pe.edu.udaff.entities.Modulo;
import pe.edu.udaff.entities.Opcion;

public interface OpcionDao {
	public List<Opcion> getAllOpcionesByUsuario(String username);
	public List<Modulo> getAllModulosByUsuario(String username);
}
