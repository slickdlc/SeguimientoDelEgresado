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

import pe.edu.udaff.entities.Persona;
import pe.edu.udaff.entities.Usuario;

@Repository("usuarioDao")
public class UsuarioDaoImpl implements UsuarioDao {
	@Autowired
	private EntityManagerFactory emf;
	@PersistenceContext
	private EntityManager em;

	@Override
	public Persona getById(Integer idUsuario) {
		// TODO Auto-generated method stub
		return em.createQuery("Select p from Persona p "
				+ "inner join p.usuario u "
				+ "where u.id=:id ", Persona.class).setParameter("id", idUsuario)
				.getSingleResult();
	}

	@Override
	public List<Persona> getAll() {
		return em.createQuery("Select p from Persona p", Persona.class).getResultList();
	}

	@Override
	public boolean modify(Persona persona) {
		try {
			SessionFactory sessionFactory = emf.unwrap(SessionFactory.class);
			Session session = sessionFactory.openSession();
			Transaction transaction = session.beginTransaction();
			session.merge(persona);
			transaction.commit();
			session.close();
			return true;
		} catch (Exception e) {
			e.getMessage();
			return false;
		}
	}

	@Override
	public boolean insert(Persona persona) {
		try {
			SessionFactory sessionFactory = emf.unwrap(SessionFactory.class);
			Session session = sessionFactory.openSession();
			Transaction transaction = session.beginTransaction();
			session.save(persona);
			transaction.commit();
			session.close();
			return true;
		} catch (Exception e) {
			System.out.println("Error en insert usuario:"+e.getMessage());
			return false;
		}
	}

}
