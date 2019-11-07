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

import pe.edu.udaff.entities.Antecedentelaboral;
import pe.edu.udaff.entities.Primerempleo;
@Repository("empleoDao")
public class EmpleoDaoImpl implements EmpleoDao {
	@Autowired
	private EntityManagerFactory emf;
	@PersistenceContext
	private EntityManager em;

	@Override
	public Primerempleo getByIdUser(Integer id) {
		// TODO Auto-generated method stub
		return em.createQuery("Select pe from Primerempleo pe "
				+ " inner join pe.egresado e "
				+ " where e.id=:id", Primerempleo.class).setParameter("id", id)
				.getSingleResult();
	}

	@Override
	public boolean modify(Primerempleo primerempleo) {
		try {
			SessionFactory sessionFactory = emf.unwrap(SessionFactory.class);
			Session session = sessionFactory.openSession();
			Transaction transaction = session.beginTransaction();
			session.merge(primerempleo);
			transaction.commit();
			session.close();
			return true;
		} catch (Exception e) {
			e.getMessage();
			return false;
		}
	}

	@Override
	public boolean insert(Primerempleo primerempleo) {
		try {
			SessionFactory sessionFactory = emf.unwrap(SessionFactory.class);
			Session session = sessionFactory.openSession();
			Transaction transaction = session.beginTransaction();
			session.save(primerempleo);
			transaction.commit();
			session.close();
			return true;
		} catch (Exception e) {
			e.getMessage();
			return false;
		}
	}

	@Override
	public Antecedentelaboral getById(Integer id) {
		return em.createQuery("Select al from Antecedentelaboral al"
				+ " where al.id=:id", Antecedentelaboral.class).setParameter("id", id)
				.getSingleResult();
	}

	@Override
	public boolean modify(Antecedentelaboral antecedentelaboral) {
		try {
			SessionFactory sessionFactory = emf.unwrap(SessionFactory.class);
			Session session = sessionFactory.openSession();
			Transaction transaction = session.beginTransaction();
			session.merge(antecedentelaboral);
			transaction.commit();
			session.close();
			return true;
		} catch (Exception e) {
			e.getMessage();
			return false;
		}
	}

	@Override
	public boolean insert(Antecedentelaboral antecedentelaboral) {
		try {
			SessionFactory sessionFactory = emf.unwrap(SessionFactory.class);
			Session session = sessionFactory.openSession();
			Transaction transaction = session.beginTransaction();
			session.save(antecedentelaboral);
			transaction.commit();
			session.close();
			return true;
		} catch (Exception e) {
			e.getMessage();
			return false;
		}
	}

	@Override
	public List<Antecedentelaboral> getAllByUser(Integer id) {
		return em.createQuery("Select al from Antecedentelaboral al"
				+ " inner join al.egresado e"
				+ " where e.id=:id and al.estado=1", Antecedentelaboral.class).setParameter("id", id)
				.getResultList();
	}

}
