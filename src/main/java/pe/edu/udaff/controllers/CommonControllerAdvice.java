package pe.edu.udaff.controllers;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;

import pe.edu.udaff.entities.Persona;
import pe.edu.udaff.entities.Usuario;
import pe.edu.udaff.service.OpcionService;
import pe.edu.udaff.service.PerfilService;
import pe.edu.udaff.service.UsuarioService;

@ControllerAdvice
public class CommonControllerAdvice {
	@Autowired
	private PerfilService perfilService;
	@Autowired
	private OpcionService opcionService;
	@Autowired
	private UsuarioService usuarioService;

	@ModelAttribute
	public void addAttributes(Model model, HttpServletRequest request) {
		StringBuffer path = request.getRequestURL();
		path.delete(0, 21);
		System.out.println(path);
		model.addAttribute("url", path);

		model.addAttribute("title", "CESDE | SGSE");
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		Usuario usuario = usuarioService.findByUsername(username);
		if (usuario != null) {
			Persona persona = usuarioService.getById(usuario.getIdUsuario());
			if (persona == null) {
				System.out.println("Persona nula jaja xd");
				model.addAttribute("nombreCompleto", username);
			} else {
				System.out.println("Persona no nua jajaj xd");
				model.addAttribute("nombreCompleto", persona.getNombres()+' '+persona.getApellidoPaterno());
			}
		}else {
			
		}
		if (usuario != null && usuario.getPerfil().getNombre().equals("ROLE_EGRESADO")) {
			model.addAttribute("isEgresado", true);
		}
		if (!username.equals("anonymousUser")) {
			model.addAttribute("opcions", opcionService.getAllOpcionesByUsuario(username));
			model.addAttribute("modulos", opcionService.getAllModulosByUsuario(username));
		}
		
	}
}
