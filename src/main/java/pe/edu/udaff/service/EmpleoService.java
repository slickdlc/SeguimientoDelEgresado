package pe.edu.udaff.service;

import java.util.List;

import pe.edu.udaff.entities.Antecedentelaboral;
import pe.edu.udaff.entities.Primerempleo;

public interface EmpleoService {
	public Primerempleo getByIdUser(Integer id);

	public boolean modify(Primerempleo primerempleo);

	public boolean insert(Primerempleo primerempleo);

	public Antecedentelaboral getById(Integer id);

	public boolean modify(Antecedentelaboral antecedentelaboral);

	public boolean insert(Antecedentelaboral antecedentelaboral);

	public List<Antecedentelaboral> getAllByUser(Integer id);

}
