package pe.edu.udaff.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import pe.edu.udaff.entities.Usuario;
import pe.edu.udaff.service.EgresadoService;
import pe.edu.udaff.service.UsuarioService;

@Controller
@RequestMapping("/admin/miperfil")
public class MiPerfilController {
	@Autowired
	private UsuarioService usuarioService;
	@Autowired
	private EgresadoService egresadoService;
	@GetMapping()
	public String home(Model model) {
		
		return "views/admin/pages/miperfil";
	}
	@ModelAttribute
	public void addAttributes(Model model){
		model.addAttribute("sexos", egresadoService.getSexos());
		model.addAttribute("estadosciviles", egresadoService.getEstadosCiviles());
		model.addAttribute("departamentos", egresadoService.getDepartamentos());
		model.addAttribute("carreras", egresadoService.getCarreras());
		model.addAttribute("modalidades", egresadoService.getModalidades());
		model.addAttribute("situacionEgresados", egresadoService.getSituaciones());
		model.addAttribute("sectores", egresadoService.getSectores());
		
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		Usuario usuario= usuarioService.findByUsername(username);
		model.addAttribute("egresadoRequerido", egresadoService.getByUsername(username));
	}
}
