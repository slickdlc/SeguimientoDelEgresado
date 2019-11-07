package pe.edu.udaff.service;

import java.util.List;

import pe.edu.udaff.entities.Carrera;
import pe.edu.udaff.entities.Departamento;
import pe.edu.udaff.entities.Egresado;
import pe.edu.udaff.entities.Estadocivil;
import pe.edu.udaff.entities.Modalidadestudio;
import pe.edu.udaff.entities.Sectorinstitucion;
import pe.edu.udaff.entities.Sexo;
import pe.edu.udaff.entities.Situacionegresado;

public interface EgresadoService {
	public Egresado getById(Integer id);
	public Egresado getByUsername(String username);
	public List<Egresado> getAll();
	public boolean modify(Egresado egresado);
	public boolean insert(Egresado egresado);
	public List<Sexo> getSexos();
	public List<Estadocivil> getEstadosCiviles();
	public List<Departamento> getDepartamentos();
	public List<Carrera> getCarreras();
	public List<Situacionegresado> getSituaciones();
	public List<Modalidadestudio> getModalidades();
	public List<Sectorinstitucion> getSectores();
}
