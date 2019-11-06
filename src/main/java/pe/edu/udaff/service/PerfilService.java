package pe.edu.udaff.service;

import java.util.List;

import pe.edu.udaff.entities.Perfil;
import pe.edu.udaff.entities.Permiso;

public interface PerfilService {
	public Perfil getById(Integer id);
	public List<Perfil> getAll();
	public boolean modify(Perfil perfil);
	public boolean insert(Perfil perfil);
	public Permiso getPermisoById(Integer id);
	public boolean modify(Permiso permiso);
	public List<Permiso> getAllPermisosByPerfil(Integer idPerfil);

}
