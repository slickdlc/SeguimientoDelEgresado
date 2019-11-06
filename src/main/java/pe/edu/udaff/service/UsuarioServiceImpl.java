package pe.edu.udaff.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import pe.edu.udaff.dao.UsuarioDao;
import pe.edu.udaff.dao.UsuarioRepository;
import pe.edu.udaff.entities.Perfil;
import pe.edu.udaff.entities.Persona;
import pe.edu.udaff.entities.Usuario;


@Service("usuarioService")
@Transactional
public class UsuarioServiceImpl implements UsuarioService, UserDetailsService {
	@Autowired
	private UsuarioDao usuarioDao;
	@Autowired
	private UsuarioRepository usuarioRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Usuario user = usuarioRepository.findByUsuario(username);
		if (user == null || !user.getEstado().toString().equals("1"))
			throw new UsernameNotFoundException(username);
		Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
		Perfil perfil = user.getPerfil();

		grantedAuthorities.add(new SimpleGrantedAuthority(perfil.getNombre()));
		
		return new org.springframework.security.core.userdetails.User(user.getUsuario(), user.getPass(),
				grantedAuthorities);
	}

	@Override
	public Persona getById(Integer id) {
		// TODO Auto-generated method stub
		return usuarioDao.getById(id);
	}

	@Override
	public List<Persona> getAll() {
		// TODO Auto-generated method stub
		return usuarioDao.getAll();
	}

	@Override
	public boolean modify(Persona persona) {
		// TODO Auto-generated method stub
		return usuarioDao.modify(persona);
	}

	@Override
	public boolean insert(Persona persona) {
		// TODO Auto-generated method stub
		return usuarioDao.insert(persona);
	}

	@Override
	public Usuario findByUsername(String username) {
		// TODO Auto-generated method stub
		return usuarioRepository.findByUsuario(username);
	}

}
