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
insert into Perfil values(null, "ROLE_SDE",2);

create table Usuario(
idUsuario int auto_increment PRIMARY KEY,
idPersona int unique,
usuario varchar(100) unique, 
pass varchar(100), 
idPerfil int,
estado tinyint,
CONSTRAINT fk_user_persona FOREIGN KEY (idPersona) REFERENCES Persona(idPersona),
CONSTRAINT fk_user_perfil FOREIGN KEY (idPerfil) REFERENCES perfil(idPerfil)
);
Insert into Usuario values (null,1,"admin","$2a$10$gsdwBO7Gc9SvN4iXWWOZyO.J1Liy.beA2ycr8DNHGCk3CRBm2TDVm",1,1);

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
create table Provincia(
idProvincia int auto_increment primary key,
nombreProvincia varchar(40)
);
create table Distrito(
idDistrito int auto_increment primary key,
nombreDistrito varchar(40)
);
create table Dirección(
idDireccion int auto_increment primary key,
nombreDireccion varchar(120),
referenciaDireccion varchar(120),
idDistrito int,
idProvincia int,
idDepartamento int,
CONSTRAINT pk_dir_dis FOREIGN KEY (idDistrito) REFERENCES Distrito(idDistrito),
CONSTRAINT pk_dir_prov FOREIGN KEY (idProvincia) REFERENCES Provincia(idProvincia),
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
añoIngreso int,
añoEgreso int,
añoTitulacion int,
idModalidadEstudio int,
idSituacionEgresado int,
idMotivoSituacion int,
detalleMotivoSituacionEgresado varchar(50),
CONSTRAINT pk_peraca_carr FOREIGN KEY (idCarrera) REFERENCES Carrera(idCarrera),
CONSTRAINT pk_peraca_motsit FOREIGN KEY (idMotivoSituacionEgresado) REFERENCES MotivoSituacionEgresado(idMotivoSituacionEgresado),
CONSTRAINT pk_peraca_sitegr FOREIGN KEY (idSituacionEgresado) REFERENCES SituacionEgresado(idSituacionEgresado),
CONSTRAINT pk_peraca_moes FOREIGN KEY (idModalidadEstudio) REFERENCES ModalidadEstudio(idModalidadEstudio)
);
create table Egresado(
idPersona int auto_increment primary key,
nombres varchar(70),
apellidoPaterno varchar(70),
apellidoMaterno varchar(70),
edad int,
idSexo int,
idEstadoCivil int,
numeroCelular varchar(9),
nombreDireccion varchar(120),
email varchar(120),
facebook varchar(120),
idPerfilAcademico int,
CONSTRAINT pk_egr_sex FOREIGN KEY (idSexo) REFERENCES Sexo(idSexo),
CONSTRAINT pk_egr_peraca FOREIGN KEY (idPerfilAcademico) REFERENCES PerfilAcademico(idPerfilAcademico),
CONSTRAINT pk_egr_esci FOREIGN KEY (idEstadoCivil) REFERENCES EstadoCivil(idEstadoCivil)
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
constraint pk_antlab_tipacc foreign key (idTipoAccesoAlEmpleo) references TipoAccesoAlEmpleo(idTipoAccesoAlEmpleo),
constraint pk_antlab_secins foreign key (idSectorInstitucion) references SectorInstitucion(idSectorInstitucion)
);
create table AntecedenteLaboral(
idAntecedenteLaboral int auto_increment primary key,
relacionadoConFormacion tinyint(4),
nombreInstitucion varchar(50),
cargoEmpleo varchar(50),
fechaInicio date,
fechaTermino date,
tipoContrato varchar(50),
idSectorInstitucion int,
estado tinyint(4),
constraint pk_antlab_secins foreign key (idSectorInstitucion) references SectorInstitucion(idSectorInstitucion)
);
create table (
id int auto_increment primary key,
nombre varchar(40)
);
create table (
id int auto_increment primary key,
nombre varchar(40)
);

Create table Dia(
idDia int auto_increment primary key,
nombreDia varchar(45)
);
insert into Dia values(null,"Lunes"),
						(null,"Martes"),
						(null,"Miercoles"),
						(null,"Jueves"),
						(null,"Viernes"),
						(null,"Sabado"),
						(null,"Domingo");
                        
				
Create table Horario(
idHorario int auto_increment primary key,
idDia int,
hora time,
idTarea int,
constraint fk_horario_dia foreign key (idDia) references Dia(idDia),
constraint fk_horario_tarea foreign key(idTarea)references Tarea(idTarea)
);

create table DetalleTarea(
idDetalleTarea int auto_increment primary key,
idHorario int,
idEstadoTarea int,
idTarea int,
comentario varchar(200),
constraint fk_detalletarea_tarea foreign key (idTarea)references Tarea(idTarea),
constraint fk_detalletarea_horario foreign key (idHorario)references Horario(idHorario),
constraint fk_detalletarea_estadotarea foreign key (idEstadoTarea) references EstadoTarea(idEstadoTarea)
);
