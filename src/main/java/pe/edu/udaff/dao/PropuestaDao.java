package pe.edu.udaff.dao;

import java.util.List;

import pe.edu.udaff.entities.Propuesta;
import pe.edu.udaff.entities.Tipopropuesta;

public interface PropuestaDao {
	public Propuesta getById(Integer id);
	public List<Propuesta> getAll();
	public boolean modify(Propuesta propuesta);
	public boolean insert(Propuesta propuesta);
	public List<Tipopropuesta> getTipos();
}
