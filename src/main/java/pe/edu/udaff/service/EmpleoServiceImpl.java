package pe.edu.udaff.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.edu.udaff.dao.EmpleoDao;
import pe.edu.udaff.entities.Antecedentelaboral;
import pe.edu.udaff.entities.Primerempleo;
@Service("empleoService")
@Transactional
public class EmpleoServiceImpl implements EmpleoService {
	@Autowired
	private EmpleoDao empleoDao;

	@Override
	public Primerempleo getByIdUser(Integer id) {
		// TODO Auto-generated method stub
		return empleoDao.getByIdUser(id);
	}

	@Override
	public boolean modify(Primerempleo primerempleo) {
		// TODO Auto-generated method stub
		return empleoDao.modify(primerempleo);
	}

	@Override
	public boolean insert(Primerempleo primerempleo) {
		// TODO Auto-generated method stub
		return empleoDao.insert(primerempleo);
	}

	@Override
	public Antecedentelaboral getById(Integer id) {
		// TODO Auto-generated method stub
		return empleoDao.getById(id);
	}

	@Override
	public boolean modify(Antecedentelaboral antecedentelaboral) {
		// TODO Auto-generated method stub
		return empleoDao.modify(antecedentelaboral);
	}

	@Override
	public boolean insert(Antecedentelaboral antecedentelaboral) {
		// TODO Auto-generated method stub
		return empleoDao.modify(antecedentelaboral);
	}

	@Override
	public List<Antecedentelaboral> getAllByUser(Integer id) {
		// TODO Auto-generated method stub
		return empleoDao.getAllByUser(id);
	}

}
