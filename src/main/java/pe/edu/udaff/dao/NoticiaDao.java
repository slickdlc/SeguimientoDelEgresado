package pe.edu.udaff.dao;

import java.util.List;

import pe.edu.udaff.entities.Noticia;

public interface NoticiaDao {
	public Noticia getById(Integer id);
	public List<Noticia> getAll();
	public List<Noticia> getAllPublic();
	public boolean modify(Noticia noticia);
	public boolean insert(Noticia noticia);
}
