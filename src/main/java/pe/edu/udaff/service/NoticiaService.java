package pe.edu.udaff.service;

import java.util.List;

import pe.edu.udaff.entities.Noticia;

public interface NoticiaService {
	public Noticia getById(Integer id);
	public List<Noticia> getAll();
	public boolean modify(Noticia noticia);
	public boolean insert(Noticia noticia);
}
