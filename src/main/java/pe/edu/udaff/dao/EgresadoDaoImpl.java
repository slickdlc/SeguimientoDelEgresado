package pe.edu.udaff.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceContext;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import pe.edu.udaff.entities.Carrera;
import pe.edu.udaff.entities.Departamento;
import pe.edu.udaff.entities.Egresado;
import pe.edu.udaff.entities.Estadocivil;
import pe.edu.udaff.entities.Modalidadestudio;
import pe.edu.udaff.entities.Sectorinstitucion;
import pe.edu.udaff.entities.Sexo;
import pe.edu.udaff.entities.Situacionegresado;
@Repository("egresadoDao")
public class EgresadoDaoImpl implements EgresadoDao{
	@Autowired
	private EntityManagerFactory emf;
	@PersistenceContext
	private EntityManager em;

	@Override
	public Egresado getById(Integer id) {
		// TODO Auto-generated method stub
		return em.createQuery("Select e from Egresado e " + "where e.id=:id", Egresado.class).setParameter("id", id)
				.getSingleResult();
	}

	@Override
	public List<Egresado> getAll() {
		return em.createQuery("from Egresado", Egresado.class).getResultList();
	}

	@Override
	public boolean modify(Egresado egresado) {
		try {
			SessionFactory sessionFactory = emf.unwrap(SessionFactory.class);
			Session session = sessionFactory.openSession();
			Transaction transaction = session.beginTransaction();
			session.merge(egresado);
			transaction.commit();
			session.close();
			return true;
		} catch (Exception e) {
			e.getMessage();
			return false;
		}
	}

	@Override
	public boolean insert(Egresado egresado) {
		try {
			SessionFactory sessionFactory = emf.unwrap(SessionFactory.class);
			Session session = sessionFactory.openSession();
			Transaction transaction = session.beginTransaction();
			session.save(egresado);
			transaction.commit();
			session.close();
			return true;
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return false;
		}
	}

	@Override
	public List<Sexo> getSexos() {
		return em.createQuery("from Sexo", Sexo.class)
				.getResultList();
	}

	@Override
	public List<Estadocivil> getEstadosCiviles() {
		return em.createQuery("from Estadocivil", Estadocivil.class)
				.getResultList();
	}

	@Override
	public List<Departamento> getDepartamentos() {
		// TODO Auto-generated method stub
		return em.createQuery("from Departamento", Departamento.class)
				.getResultList();
	}

	@Override
	public List<Carrera> getCarreras() {
		// TODO Auto-generated method stub
		return em.createQuery("from Carrera", Carrera.class)
				.getResultList();
	}

	@Override
	public List<Situacionegresado> getSituaciones() {
		// TODO Auto-generated method stub
		return em.createQuery("from Situacionegresado", Situacionegresado.class)
				.getResultList();
	}

	@Override
	public List<Modalidadestudio> getModalidades() {
		// TODO Auto-generated method stub
		return em.createQuery("from Modalidadestudio", Modalidadestudio.class)
				.getResultList();
	}

	@Override
	public List<Sectorinstitucion> getSectores() {
		// TODO Auto-generated method stub
		return em.createQuery("from Sectorinstitucion", Sectorinstitucion.class)
				.getResultList();
	}

	@Override
	public Egresado getByUsername(String username) {
		// TODO Auto-generated method stub
		return em.createQuery("Select e from Egresado e "
				+ "inner join e.persona p "
				+ "inner join p.usuario u "
				+ "where u.usuario=:username", Egresado.class).setParameter("username", username)
				.getSingleResult();
	}

}
