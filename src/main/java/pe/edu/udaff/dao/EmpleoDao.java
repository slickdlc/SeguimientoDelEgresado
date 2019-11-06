package pe.edu.udaff.dao;

import java.util.List;

import pe.edu.udaff.entities.Antecedentelaboral;
import pe.edu.udaff.entities.Egresado;
import pe.edu.udaff.entities.Primerempleo;

public interface EmpleoDao {
	public Primerempleo getByIdUser(Integer id);
	public boolean modify(Primerempleo primerempleo);
	public boolean insert(Primerempleo primerempleo);
	
	public Antecedentelaboral getById(Integer id);
	public boolean modify(Antecedentelaboral antecedentelaboral);
	public boolean insert(Antecedentelaboral antecedentelaboral);
	public List<Antecedentelaboral> getAllByUser(Integer id);

	
}
