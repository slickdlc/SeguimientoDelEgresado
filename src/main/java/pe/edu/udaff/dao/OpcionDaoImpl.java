package pe.edu.udaff.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import pe.edu.udaff.entities.Modulo;
import pe.edu.udaff.entities.Opcion;
@Repository("opcionDao")
public class OpcionDaoImpl implements OpcionDao{
	@Autowired
	private EntityManagerFactory emf;
	@PersistenceContext
	private EntityManager em;
	
	@Override
	public List<Opcion> getAllOpcionesByUsuario(String username) {
		// TODO Auto-generated method stub
		return em.createQuery("Select pr.opcion "
				+ "from Permiso pr "
				+ "inner join pr.opcion o "
				+ "where pr.estado=1 and pr.perfil= some("
				+ "select p.id from Perfil as p "
				+ "inner join p.usuarios u "
				+ "where u.usuario=:username)"
				,Opcion.class).setParameter("username", username).getResultList();
	}

	@Override
	public List<Modulo> getAllModulosByUsuario(String username) {
		// TODO Auto-generated method stub
		return em.createQuery("Select m "
				+ "from Permiso pr "
				+ "inner join pr.opcion o "
				+ "inner join o.submodulo sm "
				+ "inner join sm.modulo m "
				+ "where pr.estado=1 and pr.perfil= some("
				+ "select p.id from Perfil as p "
				+ "inner join p.usuarios u "
				+ "where u.usuario=:username)"
				+ "group by m.id"
				,Modulo.class).setParameter("username", username).getResultList();
	}
//	.createQuery("select new Modulo(m.moduloId,m.nombreModulo, m.icono) "
//			+ "from Permiso pr "
//			+ "inner join pr.opcion o "
//			+ "inner join o.submodulo s "
//			+ "inner join s.modulo m "
//			+ "where pr.perfil.perfilId = some ("
//			+ "select p.perfilId from Perfil as p "
//			+ "inner join p.usuarios u "
//			+ "where u.user= :usuario) "
//			+ "and m.estado='1' "
//			+ "group by m.moduloId", Modulo.class)

}
