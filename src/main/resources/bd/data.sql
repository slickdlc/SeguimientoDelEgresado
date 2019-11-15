insert into Departamento value(0,"Amazonas");
insert into Departamento value(0,"Ancash");
insert into Departamento value(0,"Apurimac");
insert into Departamento value(0,"Arequipa");
insert into Departamento value(0,"Ayacucho");
insert into Departamento value(0,"Cajamarca");
insert into Departamento value(0,"Cusco");
insert into Departamento value(0,"Huancavelica");
insert into Departamento value(0,"Huanuco");
insert into Departamento value(0,"Ica");
insert into Departamento value(0,"Junin");
insert into Departamento value(0,"La Libertad");
insert into Departamento value(0,"Lambayeque");
insert into Departamento value(0,"Lima");
insert into Departamento value(0,"Loreto");
insert into Departamento value(0,"Madre De Dios");
insert into Departamento value(0,"Moquegua");
insert into Departamento value(0,"Pasco");
insert into Departamento value(0,"Piura");
insert into Departamento value(0,"Puno");
insert into Departamento value(0,"San Martin");
insert into Departamento value(0,"Tacna");
insert into Departamento value(0,"Tumbes");
insert into Departamento value(0,"Ucayali");
insert into Carrera value(0,"ADMINISTRACIÓN DE EMPRESAS");
insert into Carrera value(0,"COMPUTACIÓN E INFORMÁTICA");
insert into Carrera value(0,"CONTABILIDAD");
insert into Carrera value(0,"MARKETING");
insert into Carrera value(0,"SECRETARIADO EJECUTIVO");
insert into ModalidadEstudio value(0,"SISTEMA TRADICIONAL","HASTA 2014");
insert into ModalidadEstudio value(0,"SISTEMA MODULAR","DESDE 2015");
insert into SituacionEgresado value(0,"EGRESADO CON DIPLOMA");
insert into SituacionEgresado value(0,"EGRESADO CON TITULO");
insert into SituacionEgresado value(0,"SOLO ESTUDIOS CONCLUIDOS");
insert into Sexo value(0,"MASCULINO");
insert into Sexo value(0,"FEMENINO");
insert into Estadocivil value(0,"Casado");
insert into Estadocivil value(0,"Conviviente");
insert into Estadocivil value(0,"Divorciado");
insert into Estadocivil value(0,"Separado");
insert into Estadocivil value(0,"Soltero");
insert into Estadocivil value(0,"Viudo");
Insert into Modulo values
						(null,"Usuario","fa fa-user"),
                        (null,"Egresado","fa fa-user-graduate"),
						(null,"Propuesta","fa fa-bullseye"),
                        (null,"Noticia","fa fa-newspaper");
                        
insert into Submodulo values
(null,1,"Usuario","/admin/usuario"),
(null,2,"Mi Perfil","/admin/miperfil"),
(null,2,"Egresados","/admin/egresado"),
(null,3,"Propuestas","/admin/propuesta"),
(null,4,"Noticia","/admin/noticia");
Insert into Opcion values
						(null,1,"Agregar Usuario","fas fa-plus"),
                        (null,1,"Cambiar Estado Usuario","fas fa-sync-alt"),
                        (null,1,"Editar Usuario","far fa-edit"),
                        (null,1,"Listar Usuarios",""),
                        (null,2,"Ver Perfil","fas fa-eye"),/*5*/
                        (null,3,"Agregar Egresado","fas fa-plus"),                        
                        (null,3,"Cambiar Estado Egresado","fas fa-sync-alt"),
                        (null,3,"Editar Egresado","far fa-edit"),
                        (null,3,"Listar Egresados",""),
                        (null,3,"Agregar Antecedente","fas fa-plus"),/*10*/
                        (null,3,"Editar Antecedente","fas fa-edit"),
                        (null,3,"Eliminar Antecedente","fas fa-trash"),
                        (null,4,"Realizar Propuesta","fas fa-bullseye"),
                        (null,4,"Listar Propuestas",""),
                        (null,5,"Agregar Noticia","fas fa-plus"),/*15*/
                        (null,5,"Cambiar Estado Noticia","fas fa-sync-alt"),
                        (null,5,"Editar Noticia","far fa-edit");/*18*/
/* <Permisos para el admin>*/
insert into Permiso values
						(null,1,1,1),
                        (null,2,1,1),
                        (null,3,1,1),
                        (null,4,1,1),
                        (null,6,1,1),
                        (null,7,1,1),
                        (null,8,1,1),
                        (null,9,1,1),
                        (null,10,1,1),
                        (null,11,1,1),
                        (null,12,1,1),
						(null,13,1,1),
                        (null,14,1,1),
                        (null,15,1,1),
                        (null,16,1,1),
                        (null,17,1,1);
                        /* <Permisos para el admin/>*/
                        /* <Permisos para el SDE>*/
                        
insert into Permiso values
                        (null,8,3,1),
                        (null,9,3,1),
						(null,10,3,1),
                        (null,11,3,1),
                        (null,12,3,1),
                        (null,14,3,1),
                        (null,15,3,1),
						(null,16,3,1),
                        (null,17,3,1);
                         /* <Permisos para el SDE/>*/
                         /* <Permisos para el Egresado>*/
insert into Permiso values
                        (null,5,2,1),
                        (null,8,2,1),
                        (null,10,2,1),
                        (null,11,2,1),
                        (null,12,2,1),
                        (null,13,2,1); /* <Permisos para el Egresado/>*/