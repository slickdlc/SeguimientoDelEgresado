package pe.edu.udaff.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.edu.udaff.dao.PropuestaDao;
import pe.edu.udaff.entities.Propuesta;
@Service("propuestaService")
@Transactional
public class PropuestaServiceImpl implements PropuestaService {
	@Autowired
	private PropuestaDao propuestaDao;
	@Override
	public Propuesta getById(Integer id) {
		// TODO Auto-generated method stub
		return propuestaDao.getById(id);
	}

	@Override
	public List<Propuesta> getAll() {
		// TODO Auto-generated method stub
		return propuestaDao.getAll();
	}

	@Override
	public boolean modify(Propuesta propuesta) {
		// TODO Auto-generated method stub
		return propuestaDao.modify(propuesta);
	}

	@Override
	public boolean insert(Propuesta propuesta) {
		// TODO Auto-generated method stub
		return propuestaDao.insert(propuesta);
	}

}
