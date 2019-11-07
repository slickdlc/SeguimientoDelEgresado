package pe.edu.udaff.controllers;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import pe.edu.udaff.entities.Propuesta;
import pe.edu.udaff.entities.Usuario;
import pe.edu.udaff.service.PropuestaService;
import pe.edu.udaff.service.UsuarioService;
import pe.edu.udaff.util.JsonResponse;

@Controller
@RequestMapping("/admin/propuesta")
public class PropuestaController {
	@Autowired
	private PropuestaService propuestaService;
	private JsonResponse jsonResponse;
	@Autowired
	private UsuarioService usuarioService;
	
	@GetMapping()
	public String renderizarPagina(){
		return "views/admin/pages/propuesta";
	}
	@ModelAttribute
	public void addAttributes(Model model){

		model.addAttribute("propuestas",propuestaService.getAll());
		model.addAttribute("tipos",propuestaService.getTipos());
	}

	@ResponseBody
	@PostMapping("/insertar")
	public JsonResponse Agregar(@RequestBody Propuesta propuesta) {
		jsonResponse= new JsonResponse();
		propuesta.setFecha(new Date());
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		Usuario usuario= usuarioService.findByUsername(username);
		propuesta.setUsuario(usuario);
		boolean inserted;
		inserted= propuestaService.insert(propuesta);
		jsonResponse.respuestaInsertar(inserted);
		
		return jsonResponse;
	}
	@GetMapping("/informacion")
	public String obtener(@RequestParam(name="id")Integer idPropuesta, Model model) {
		model.addAttribute("egresadoRequerido",propuestaService.getById(idPropuesta));
		return renderizarPagina();
	}
	@ResponseBody
	@PostMapping("/modificar")
	public JsonResponse modificar(@RequestParam(name="id")Integer idPropuesta,@RequestBody Propuesta propuesta) {
		jsonResponse= new JsonResponse();
		propuesta.setIdPropuesta(idPropuesta);
		boolean modified;
		modified= propuestaService.modify(propuesta);
		jsonResponse.respuestaModificar(modified);
		
		return jsonResponse;
	}
}
