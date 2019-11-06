package pe.edu.udaff.service;

import java.util.List;

import pe.edu.udaff.entities.Persona;
import pe.edu.udaff.entities.Usuario;

public interface UsuarioService {
	public Persona getById(Integer idUsuario);
	public List<Persona> getAll();
	public boolean modify(Persona persona);
	public boolean insert(Persona persona);
	public Usuario findByUsername(String username);
}
