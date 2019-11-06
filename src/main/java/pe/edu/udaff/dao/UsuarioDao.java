package pe.edu.udaff.dao;

import java.util.List;

import pe.edu.udaff.entities.Persona;
import pe.edu.udaff.entities.Usuario;

public interface UsuarioDao {
	public Persona getById(Integer idUsuario);
	public List<Persona> getAll();
	public boolean modify(Persona persona);
	public boolean insert(Persona persona);
}
