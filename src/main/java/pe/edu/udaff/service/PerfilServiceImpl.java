package pe.edu.udaff.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.edu.udaff.dao.PerfilDao;
import pe.edu.udaff.entities.Perfil;
import pe.edu.udaff.entities.Permiso;

@Service("perfilService")
@Transactional
public class PerfilServiceImpl implements PerfilService {
	@Autowired
	private PerfilDao perfilDao;

	@Override
	public Perfil getById(Integer id) {
		// TODO Auto-generated method stub
		return perfilDao.getById(id);
	}

	@Override
	public List<Perfil> getAll() {
		// TODO Auto-generated method stub
		return perfilDao.getAll();
	}

	@Override
	public boolean modify(Perfil perfil) {
		// TODO Auto-generated method stub
		return perfilDao.modify(perfil);
	}

	@Override
	public boolean insert(Perfil perfil) {
		// TODO Auto-generated method stub
		return perfilDao.insert(perfil);
	}

	@Override
	public boolean modify(Permiso permiso) {
		// TODO Auto-generated method stub
		return perfilDao.modify(permiso);
	}
	public List<Permiso> getAllPermisosByPerfil(Integer idPerfil){
		return perfilDao.getAllPermisosByPerfil(idPerfil);
	}

	@Override
	public Permiso getPermisoById(Integer id) {
		return perfilDao.getPermisoById(id);
	}

}
