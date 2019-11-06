package pe.edu.udaff.dao;

import java.util.List;

import pe.edu.udaff.entities.Perfil;
import pe.edu.udaff.entities.Permiso;

public interface PerfilDao {
	public Perfil getById(Integer id);
	public List<Perfil> getAll();
	public boolean modify(Perfil perfil);
	public boolean insert(Perfil perfil);
	//permisos
	
	public Permiso getPermisoById(Integer id);
	public boolean modify(Permiso permiso);
	public List<Permiso> getAllPermisosByPerfil(Integer idPerfil);
}
