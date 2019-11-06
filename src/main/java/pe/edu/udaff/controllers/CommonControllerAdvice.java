package pe.edu.udaff.controllers;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;

import pe.edu.udaff.service.OpcionService;

@ControllerAdvice
public class CommonControllerAdvice {
	@Autowired
	private OpcionService opcionService;

	@ModelAttribute
	public void addAttributes(Model model, HttpServletRequest request) {
		model.addAttribute("title", "CESDE | SSE");
		String username = SecurityContextHolder.getContext().getAuthentication().getName();

		model.addAttribute("nombreCompleto", username);
		if (!username.equals("anonymousUser")) {
			model.addAttribute("opcions", opcionService.getAllOpcionesByUsuario(username));
			model.addAttribute("modulos", opcionService.getAllModulosByUsuario(username));
		}
	}
}
