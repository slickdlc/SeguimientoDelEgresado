Create database seguimientoalegresado;
use seguimientoalegresado;

create table Modulo(
idModulo int auto_increment primary key,
nombre varchar(40),
icono varchar(40)
);
create table SubModulo(
idSubModulo int auto_increment primary key,
idModulo int,
nombre varchar(40),
url varchar(100),
constraint fk_submodulo_modulo foreign key (idModulo) references Modulo(idModulo)
);

create table Opcion(
idOpcion int auto_increment primary key,
idSubModulo int,
nombre varchar(40),
icon varchar(30),
constraint fk_opcion_submodulo foreign key(idSubModulo)references SubModulo(idSubModulo)
);

create table Perfil(
idPerfil int auto_increment primary key,
nombre varchar(40) unique,
estado tinyint(4)
);
insert into Perfil values(null, "ROLE_ADMIN",1);
insert into Perfil values(null, "ROLE_EGRESADO",1);
insert into Perfil values(null, "ROLE_SDE",1);


create table Permiso(
idPermiso int auto_increment primary key,
idOpcion int,
idPerfil int,
estado tinyint,
constraint fk_permiso_subModulo foreign key (idOpcion) references Opcion(idOpcion),
constraint fk_permiso_perfil foreign key (idPerfil) references perfil(idPerfil)
);

create table Departamento(
idDepartamento int auto_increment primary key,
nombreDepartamento varchar(40)
);
create table Direccion(
idDireccion int auto_increment primary key,
nombreDireccion varchar(120),
referenciaDireccion varchar(120),
idDepartamento int,
nombreProvincia varchar(40),
nombreDistrito varchar(40),
CONSTRAINT pk_dir_dpt FOREIGN KEY (idDepartamento) REFERENCES Departamento(idDepartamento)
);
create table EstadoCivil(
idEstadoCivil int auto_increment primary key,
nombreEstadoCivil varchar(40)
);
create table Sexo(
idSexo int auto_increment primary key,
nombreSexo varchar(40)
);
Create table Carrera(
idCarrera int auto_increment primary key,
nombreCarrera varchar(40)
);
Create table ModalidadEstudio(
idModalidadEstudio int auto_increment primary key,
nombreModalidadEstudio varchar(50),
rangoFecha varchar(30)
);
Create table SituacionEgresado(
idSituacionEgresado int auto_increment primary key,
nombreSituacionEgresado varchar(50)
);
Create table MotivoSituacionEgresado(
idMotivoSituacionEgresado int auto_increment primary key,
nombreMotivoSituacionEgresado varchar(50)
);
Create table PerfilAcademico(
idPerfilAcademico int auto_increment primary key,
idCarrera int,
anoIngreso int,
anoEgreso int,
anoTitulacion int,
idModalidadEstudio int,
idSituacionEgresado int,
idMotivoSituacionEgresado int,
detalleMotivoSituacionEgresado varchar(50),
CONSTRAINT pk_peraca_carr FOREIGN KEY (idCarrera) REFERENCES Carrera(idCarrera),
CONSTRAINT pk_peraca_motsit FOREIGN KEY (idMotivoSituacionEgresado) REFERENCES MotivoSituacionEgresado(idMotivoSituacionEgresado),
CONSTRAINT pk_peraca_sitegr FOREIGN KEY (idSituacionEgresado) REFERENCES SituacionEgresado(idSituacionEgresado),
CONSTRAINT pk_peraca_moes FOREIGN KEY (idModalidadEstudio) REFERENCES ModalidadEstudio(idModalidadEstudio)
);

create table Usuario(
idUsuario int auto_increment PRIMARY KEY,
usuario varchar(100) unique, 
pass varchar(100), 
idPerfil int,
estado tinyint,
CONSTRAINT fk_user_perfil FOREIGN KEY (idPerfil) REFERENCES Perfil(idPerfil)
);
Insert into Usuario values (null,"admin","$2a$10$gsdwBO7Gc9SvN4iXWWOZyO.J1Liy.beA2ycr8DNHGCk3CRBm2TDVm",1,1);
create table Persona(
idPersona int auto_increment primary key,
nombres varchar(70),
apellidoPaterno varchar(70),
apellidoMaterno varchar(70),
dni varchar(8),
idUsuario int,
constraint fk_pers_user foreign key (idUsuario) references Usuario(idUsuario)
);


create table SectorInstitucion(
idSectorInstitucion int auto_increment primary key,
nombreSectorInstitucion varchar(40)
);
insert into SectorInstitucion values(1,"ONG"),(2,"Privado"),(3,"Público");
create table TipoAccesoAlEmpleo(
idTipoAccesoAlEmpleo int auto_increment primary key,
nombreTipoAccesoAlEmpleo varchar(50)
);
create table PrimerEmpleo(
idPrimerEmpleo int auto_increment primary key,
trabajoDuranteEstudios tinyint(4),
relacionadoConFormacion tinyint(4),
nombreInstitucion varchar(50),
cargoEmpleo varchar(50),
fechaInicio date,
fechaTermino date,
tipoContrato varchar(50),
nombreDireccion varchar(120),
idSectorInstitucion int,
estado tinyint(4),
mesesAntesDelPrimerEmpleo int,
idTipoAccesoAlEmpleo int,
detalleAccesoAlEmpleo varchar(200),
constraint fk_primempl_tipacc foreign key (idTipoAccesoAlEmpleo) references TipoAccesoAlEmpleo(idTipoAccesoAlEmpleo),
constraint fk_primempl_secins foreign key (idSectorInstitucion) references SectorInstitucion(idSectorInstitucion)
);
create table Egresado(
idEgresado int auto_increment primary key,
idPersona int,
fechaNacimiento date,
idSexo int,
idEstadoCivil int,
numeroCelular varchar(9),
idDireccion int,
email varchar(120),
facebook varchar(120),
idPerfilAcademico int,
idPrimerEmpleo int,
constraint fk_egre_pers foreign key (idPersona) references Persona(idPersona),
constraint fk_egre_priempl foreign key (idPrimerEmpleo) references PrimerEmpleo(idPrimerEmpleo),
CONSTRAINT pk_egr_sex FOREIGN KEY (idSexo) REFERENCES Sexo(idSexo),
CONSTRAINT pk_egr_dir FOREIGN KEY (idDireccion) REFERENCES Direccion(idDireccion),
CONSTRAINT pk_egr_peraca FOREIGN KEY (idPerfilAcademico) REFERENCES PerfilAcademico(idPerfilAcademico),
CONSTRAINT pk_egr_esci FOREIGN KEY (idEstadoCivil) REFERENCES EstadoCivil(idEstadoCivil)
);

create table AntecedenteLaboral(
idAntecedenteLaboral int auto_increment primary key,
idEgresado int,
relacionadoConFormacion tinyint(4),
nombreInstitucion varchar(50),
cargoEmpleo varchar(50),
fechaInicio date,
fechaTermino date,
tipoContrato varchar(50),
idSectorInstitucion int,
estado tinyint(4),
constraint fk_antlab_egre foreign key (idEgresado)references Egresado(idEgresado),
constraint fk_antlab_secins foreign key (idSectorInstitucion) references SectorInstitucion(idSectorInstitucion)
);
create table TipoPropuesta(
idTipoPropuesta int auto_increment primary key,
nombreTipoPropuesta varchar(40)
);
insert into TipoPropuesta values(0,"Capacitacion"),(0,"Especializacion"),(0,"Evento Deportivo"),(0,"Bolsa de Trabajo"),
(0,"Evento Cultural"),(0,"Otro");
create table Propuesta(
idPropuesta int auto_increment primary key,
idTipoPropuesta int,
descripcionPropuesta varchar(200),
idUsuario int,
fecha date,
constraint fk_prop_user foreign key (idUsuario)references Usuario(idUsuario),
constraint fk_prop_tipprop foreign key (idTipoPropuesta)references TipoPropuesta(idTipoPropuesta)

);

create table Noticia(
idNoticia int auto_increment primary key,
descripcionNoticia varchar(255),
urlFoto varchar(500),
fechaPublicacion date,
fechaDespublicacion date,
idUsuario int,
estado tinyint(4),
constraint fk_Not_user foreign key (idUsuario)references Usuario(idUsuario)
);
