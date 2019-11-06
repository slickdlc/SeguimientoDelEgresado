package pe.edu.udaff.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.edu.udaff.dao.OpcionDao;
import pe.edu.udaff.entities.Modulo;
import pe.edu.udaff.entities.Opcion;

@Service("opcionService")
@Transactional
public class OpcionServiceImpl implements OpcionService {
	@Autowired
	private OpcionDao opcionDao;

	@Override
	public List<Opcion> getAllOpcionesByUsuario(String username) {
		// TODO Auto-generated method stub
		return opcionDao.getAllOpcionesByUsuario(username);
	}

	@Override
	public List<Modulo> getAllModulosByUsuario(String username) {
		// TODO Auto-generated method stub
		return opcionDao.getAllModulosByUsuario(username);
	}

}
