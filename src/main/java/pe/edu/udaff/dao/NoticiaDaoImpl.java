package pe.edu.udaff.dao;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceContext;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import pe.edu.udaff.entities.Noticia;
@Repository("noticiaDao")
public class NoticiaDaoImpl implements NoticiaDao{
	@Autowired
	private EntityManagerFactory emf;
	@PersistenceContext
	private EntityManager em;

	@Override
	public Noticia getById(Integer id) {
		// TODO Auto-generated method stub
		return em.createQuery("Select n from Noticia n where n.id=:id", Noticia.class).setParameter("id", id)
				.getSingleResult();
	}

	@Override
	public List<Noticia> getAll() {
		return em.createQuery("from Noticia", Noticia.class)
			.getResultList();
	}

	@Override
	public boolean modify(Noticia noticia) {
		try {
			SessionFactory sessionFactory = emf.unwrap(SessionFactory.class);
			Session session = sessionFactory.openSession();
			Transaction transaction = session.beginTransaction();
			session.merge(noticia);
			transaction.commit();
			session.close();
			return true;
		} catch (Exception e) {
			e.getMessage();
			return false;
		}
	}

	@Override
	public boolean insert(Noticia noticia) {
		try {
			SessionFactory sessionFactory = emf.unwrap(SessionFactory.class);
			Session session = sessionFactory.openSession();
			Transaction transaction = session.beginTransaction();
			session.save(noticia);
			transaction.commit();
			session.close();
			return true;
		} catch (Exception e) {
			e.getMessage();
			return false;
		}
	}

	@Override
	public List<Noticia> getAllPublic() {
		Date date= new Date();
		String format= "yyyy-MM-dd";
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		sdf.format(date);
		return em.createQuery("Select n from Noticia n where n.fechaDespublicacion>=:date and n.estado=1", Noticia.class)
				.setParameter("date", date).getResultList();
	}

}
