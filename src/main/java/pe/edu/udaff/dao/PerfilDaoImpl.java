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

import pe.edu.udaff.entities.Perfil;
import pe.edu.udaff.entities.Permiso;

@Repository("perfilDao")
public class PerfilDaoImpl implements PerfilDao {
	@Autowired
	private EntityManagerFactory entityManagerFactory;
	@PersistenceContext
	private EntityManager em;

	@Override
	public Perfil getById(Integer id) {
		// TODO Auto-generated method stub
		return em.createQuery("from Perfil p where p.id=:id",Perfil.class)
				.setParameter("id", id).getSingleResult();
	}

	@Override
	public List<Perfil> getAll() {
		// TODO Auto-generated method stub
		return em.createQuery("from Perfil",Perfil.class).getResultList();
	}

	@Override
	public boolean modify(Perfil perfil) {
		try {
			SessionFactory sessionFactory = entityManagerFactory.unwrap(SessionFactory.class);
			Session session = sessionFactory.openSession();
			Transaction transaction = session.beginTransaction();
			session.merge(perfil);
			transaction.commit();
			session.close();
			return true;
		} catch (Exception e) {
			e.getMessage();
			return false;
		}
	}

	@Override
	public boolean insert(Perfil perfil) {
		try {
			SessionFactory sessionFactory = entityManagerFactory.unwrap(SessionFactory.class);
			Session session = sessionFactory.openSession();
			Transaction transaction = session.beginTransaction();
			session.save(perfil);
			transaction.commit();
			session.close();
			return true;
		} catch (Exception e) {
			e.getMessage();
			return false;
		}
	}

	@Override
	public boolean modify(Permiso permiso) {
		// TODO Auto-generated method stub
		try {
			SessionFactory sessionFactory = entityManagerFactory.unwrap(SessionFactory.class);
			Session session = sessionFactory.openSession();
			Transaction transaction = session.beginTransaction();
			session.merge(permiso);
			transaction.commit();
			session.close();
			return true;
		} catch (Exception e) {
			e.getMessage();
			return false;
		}
	}

	@Override
	public List<Permiso> getAllPermisosByPerfil(Integer idPerfil) {
		return em.createQuery("Select pr "
				+ "from Permiso pr "
				+ "inner join pr.perfil p "
				+ "where p.id=:id",Permiso.class)
				.setParameter("id", idPerfil).getResultList();
	}

	@Override
	public Permiso getPermisoById(Integer id) {
		return em.createQuery("from Permiso p where p.id=:id"
				,Permiso.class)
				.setParameter("id", id)
				.getSingleResult();
	}

}
