package pe.edu.udaff.entities;
// Generated 06-nov-2019 10:11:51 by Hibernate Tools 5.1.10.Final

import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

/**
 * Perfil generated by hbm2java
 */
@Entity
@Table(name = "perfil", catalog = "seguimientoalegresado", uniqueConstraints = @UniqueConstraint(columnNames = "nombre"))
public class Perfil implements java.io.Serializable {

	private Integer idPerfil;
	private String nombre;
	private Byte estado;
	private Set<Permiso> permisos = new HashSet<Permiso>(0);
	private Set<Usuario> usuarios = new HashSet<Usuario>(0);

	public Perfil() {
	}

	public Perfil(String nombre, Byte estado, Set<Permiso> permisos, Set<Usuario> usuarios) {
		this.nombre = nombre;
		this.estado = estado;
		this.permisos = permisos;
		this.usuarios = usuarios;
	}

	@Id
	@GeneratedValue(strategy = IDENTITY)

	@Column(name = "idPerfil", unique = true, nullable = false)
	public Integer getIdPerfil() {
		return this.idPerfil;
	}

	public void setIdPerfil(Integer idPerfil) {
		this.idPerfil = idPerfil;
	}

	@Column(name = "nombre", unique = true, length = 40)
	public String getNombre() {
		return this.nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	@Column(name = "estado")
	public Byte getEstado() {
		return this.estado;
	}

	public void setEstado(Byte estado) {
		this.estado = estado;
	}

	@OneToMany(fetch = FetchType.EAGER, mappedBy = "perfil")
	public Set<Permiso> getPermisos() {
		return this.permisos;
	}

	public void setPermisos(Set<Permiso> permisos) {
		this.permisos = permisos;
	}

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "perfil")
	public Set<Usuario> getUsuarios() {
		return this.usuarios;
	}

	public void setUsuarios(Set<Usuario> usuarios) {
		this.usuarios = usuarios;
	}

}
