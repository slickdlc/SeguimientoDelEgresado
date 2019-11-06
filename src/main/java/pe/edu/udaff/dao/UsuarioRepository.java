package pe.edu.udaff.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import pe.edu.udaff.entities.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
	public Usuario findByUsuario(String usuario);
}