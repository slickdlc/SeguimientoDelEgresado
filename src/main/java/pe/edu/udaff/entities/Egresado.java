package pe.edu.udaff.entities;
// Generated 06-nov-2019 23:39:51 by Hibernate Tools 5.1.10.Final

import static javax.persistence.GenerationType.IDENTITY;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * Egresado generated by hbm2java
 */
@Entity
@Table(name = "egresado", catalog = "seguimientoalegresado")
public class Egresado implements java.io.Serializable {

	private Integer idEgresado;
	private Direccion direccion;
	private Estadocivil estadocivil;
	private Perfilacademico perfilacademico;
	private Persona persona;
	private Primerempleo primerempleo;
	private Sexo sexo;
	private Date fechaNacimiento;
	private String numeroCelular;
	private String email;
	private String facebook;
	private Set<Antecedentelaboral> antecedentelaborals = new HashSet<Antecedentelaboral>(0);

	public Egresado() {
	}

	public Egresado(Direccion direccion, Estadocivil estadocivil, Perfilacademico perfilacademico, Persona persona,
			Primerempleo primerempleo, Sexo sexo, Date fechaNacimiento, String numeroCelular, String email,
			String facebook, Set<Antecedentelaboral> antecedentelaborals) {
		this.direccion = direccion;
		this.estadocivil = estadocivil;
		this.perfilacademico = perfilacademico;
		this.persona = persona;
		this.primerempleo = primerempleo;
		this.sexo = sexo;
		this.fechaNacimiento = fechaNacimiento;
		this.numeroCelular = numeroCelular;
		this.email = email;
		this.facebook = facebook;
		this.antecedentelaborals = antecedentelaborals;
	}

	@Id
	@GeneratedValue(strategy = IDENTITY)

	@Column(name = "idEgresado", unique = true, nullable = false)
	public Integer getIdEgresado() {
		return this.idEgresado;
	}

	public void setIdEgresado(Integer idEgresado) {
		this.idEgresado = idEgresado;
	}

	@OneToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
	@JoinColumn(name = "idDireccion")
	public Direccion getDireccion() {
		return this.direccion;
	}

	public void setDireccion(Direccion direccion) {
		this.direccion = direccion;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idEstadoCivil")
	public Estadocivil getEstadocivil() {
		return this.estadocivil;
	}

	public void setEstadocivil(Estadocivil estadocivil) {
		this.estadocivil = estadocivil;
	}

	@OneToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
	@JoinColumn(name = "idPerfilAcademico")
	public Perfilacademico getPerfilacademico() {
		return this.perfilacademico;
	}

	public void setPerfilacademico(Perfilacademico perfilacademico) {
		this.perfilacademico = perfilacademico;
	}

	@OneToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
	@JoinColumn(name = "idPersona")
	public Persona getPersona() {
		return this.persona;
	}

	public void setPersona(Persona persona) {
		this.persona = persona;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idPrimerEmpleo")
	public Primerempleo getPrimerempleo() {
		return this.primerempleo;
	}

	public void setPrimerempleo(Primerempleo primerempleo) {
		this.primerempleo = primerempleo;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idSexo")
	public Sexo getSexo() {
		return this.sexo;
	}

	public void setSexo(Sexo sexo) {
		this.sexo = sexo;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "fechaNacimiento", length = 10)
	public Date getFechaNacimiento() {
		return this.fechaNacimiento;
	}

	public void setFechaNacimiento(Date fechaNacimiento) {
		this.fechaNacimiento = fechaNacimiento;
	}

	@Column(name = "numeroCelular", length = 9)
	public String getNumeroCelular() {
		return this.numeroCelular;
	}

	public void setNumeroCelular(String numeroCelular) {
		this.numeroCelular = numeroCelular;
	}

	@Column(name = "email", length = 120)
	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Column(name = "facebook", length = 120)
	public String getFacebook() {
		return this.facebook;
	}

	public void setFacebook(String facebook) {
		this.facebook = facebook;
	}

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "egresado")
	public Set<Antecedentelaboral> getAntecedentelaborals() {
		return this.antecedentelaborals;
	}

	public void setAntecedentelaborals(Set<Antecedentelaboral> antecedentelaborals) {
		this.antecedentelaborals = antecedentelaborals;
	}

}
