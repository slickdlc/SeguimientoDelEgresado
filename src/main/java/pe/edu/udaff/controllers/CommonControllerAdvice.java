package pe.edu.udaff.controllers;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;

import pe.edu.udaff.entities.Usuario;
import pe.edu.udaff.service.OpcionService;
import pe.edu.udaff.service.UsuarioService;

@ControllerAdvice
public class CommonControllerAdvice {
	@Autowired
	private OpcionService opcionService;
	@Autowired
	private UsuarioService usuarioService;

	@ModelAttribute
	public void addAttributes(Model model, HttpServletRequest request) {
		model.addAttribute("title", "CESDE | SGSE");
		String username = SecurityContextHolder.getContext().getAuthentication().getName();

		model.addAttribute("nombreCompleto", username);
		Usuario usuario= usuarioService.findByUsername(username);
		if(usuario!=null &&usuario.getPerfil().getNombre().equals("ROLE_EGRESADO")) {
			model.addAttribute("isEgresado",true);
		}
		if (!username.equals("anonymousUser")) {
			model.addAttribute("opcions", opcionService.getAllOpcionesByUsuario(username));
			model.addAttribute("modulos", opcionService.getAllModulosByUsuario(username));
		}
	}
}
