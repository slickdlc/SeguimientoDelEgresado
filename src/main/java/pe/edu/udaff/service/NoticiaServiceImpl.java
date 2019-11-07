package pe.edu.udaff.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.edu.udaff.dao.NoticiaDao;
import pe.edu.udaff.entities.Noticia;
@Service("noticiaService")
@Transactional
public class NoticiaServiceImpl implements NoticiaService {
	@Autowired
	private NoticiaDao noticiaDao;
	@Override
	public Noticia getById(Integer id) {
		// TODO Auto-generated method stub
		return noticiaDao.getById(id);
	}

	@Override
	public List<Noticia> getAll() {
		// TODO Auto-generated method stub
		return noticiaDao.getAll();
	}

	@Override
	public boolean modify(Noticia noticia) {
		// TODO Auto-generated method stub
		return noticiaDao.modify(noticia);
	}

	@Override
	public boolean insert(Noticia noticia) {
		// TODO Auto-generated method stub
		return noticiaDao.insert(noticia);
	}

	@Override
	public List<Noticia> getAllPublic() {
		// TODO Auto-generated method stub
		return noticiaDao.getAllPublic();
	}

}
