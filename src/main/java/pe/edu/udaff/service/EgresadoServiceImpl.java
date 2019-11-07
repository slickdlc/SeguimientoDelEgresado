package pe.edu.udaff.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.edu.udaff.dao.EgresadoDao;
import pe.edu.udaff.entities.Carrera;
import pe.edu.udaff.entities.Departamento;
import pe.edu.udaff.entities.Egresado;
import pe.edu.udaff.entities.Estadocivil;
import pe.edu.udaff.entities.Modalidadestudio;
import pe.edu.udaff.entities.Sectorinstitucion;
import pe.edu.udaff.entities.Sexo;
import pe.edu.udaff.entities.Situacionegresado;
@Service("egresadoService")
@Transactional
public class EgresadoServiceImpl implements EgresadoService {
	@Autowired
	private EgresadoDao egresadoDao;

	@Override
	public Egresado getById(Integer id) {
		// TODO Auto-generated method stub
		return egresadoDao.getById(id);
	}

	@Override
	public List<Egresado> getAll() {
		// TODO Auto-generated method stub
		return egresadoDao.getAll();
	}

	@Override
	public boolean modify(Egresado egresado) {
		// TODO Auto-generated method stub
		return egresadoDao.modify(egresado);
	}

	@Override
	public boolean insert(Egresado egresado) {
		// TODO Auto-generated method stub
		return egresadoDao.insert(egresado);
	}

	@Override
	public List<Sexo> getSexos() {
		// TODO Auto-generated method stub
		return egresadoDao.getSexos();
	}

	@Override
	public List<Estadocivil> getEstadosCiviles() {
		// TODO Auto-generated method stub
		return egresadoDao.getEstadosCiviles();
	}

	@Override
	public List<Departamento> getDepartamentos() {
		// TODO Auto-generated method stub
		return egresadoDao.getDepartamentos();
	}

	@Override
	public List<Carrera> getCarreras() {
		// TODO Auto-generated method stub
		return egresadoDao.getCarreras();
	}

	@Override
	public List<Situacionegresado> getSituaciones() {
		// TODO Auto-generated method stub
		return egresadoDao.getSituaciones();
	}

	@Override
	public List<Modalidadestudio> getModalidades() {
		// TODO Auto-generated method stub
		return egresadoDao.getModalidades();
	}

	@Override
	public List<Sectorinstitucion> getSectores() {
		// TODO Auto-generated method stub
		return egresadoDao.getSectores();
	}

}
