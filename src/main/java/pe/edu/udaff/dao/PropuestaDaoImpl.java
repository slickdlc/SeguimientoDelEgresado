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

import pe.edu.udaff.entities.Propuesta;
import pe.edu.udaff.entities.Tipopropuesta;
@Repository("propuestaDao")
public class PropuestaDaoImpl implements PropuestaDao{
	@Autowired
	private EntityManagerFactory emf;
	@PersistenceContext
	private EntityManager em;

	@Override
	public Propuesta getById(Integer id) {
		// TODO Auto-generated method stub
		return em.createQuery("Select e from Egresado e " + "where e.id=:id", Propuesta.class).setParameter("id", id)
				.getSingleResult();
	}

	@Override
	public List<Propuesta> getAll() {
		return em.createQuery("from Propuesta", Propuesta.class).getResultList();
	}

	@Override
	public boolean modify(Propuesta propuesta) {
		try {
			SessionFactory sessionFactory = emf.unwrap(SessionFactory.class);
			Session session = sessionFactory.openSession();
			Transaction transaction = session.beginTransaction();
			session.merge(propuesta);
			transaction.commit();
			session.close();
			return true;
		} catch (Exception e) {
			e.getMessage();
			return false;
		}
	}

	@Override
	public boolean insert(Propuesta propuesta) {
		try {
			SessionFactory sessionFactory = emf.unwrap(SessionFactory.class);
			Session session = sessionFactory.openSession();
			Transaction transaction = session.beginTransaction();
			session.save(propuesta);
			transaction.commit();
			session.close();
			return true;
		} catch (Exception e) {
			e.getMessage();
			return false;
		}
	}

	@Override
	public List<Tipopropuesta> getTipos() {
		// TODO Auto-generated method stub
		return em.createQuery("from Tipopropuesta",Tipopropuesta.class).getResultList();
	}

}
