package pe.edu.udaff.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import pe.edu.udaff.entities.Persona;
import pe.edu.udaff.entities.Usuario;
import pe.edu.udaff.service.PerfilService;
import pe.edu.udaff.service.UsuarioService;
import pe.edu.udaff.util.JsonResponse;

@Controller
@RequestMapping("/admin/usuario")
public class UsuarioController {
	@Autowired
	private UsuarioService usuarioService;
	@Autowired
	private PerfilService perfilService;
	 
	private JsonResponse jsonResponse;
	
	@GetMapping()
	public String renderizarPagina(){
		return "views/admin/pages/usuario";
	}
	@ModelAttribute
	public void addAttributes(Model model){
		model.addAttribute("personas",usuarioService.getAll());
		model.addAttribute("perfiles",perfilService.getAll());
	}
	@ResponseBody
	@PostMapping("/cambiarEstado")
	public Byte cambiarEstado(@RequestParam(name="id")Integer idUsuario) {
		Persona persona=usuarioService.getById(idUsuario);
		Byte estado=persona.getUsuario().getEstado();
		if (estado==1)
			estado = 0;
		else
			estado = 1;
		persona.getUsuario().setEstado(estado);
		usuarioService.modify(persona);
		return estado;
	}
	@ResponseBody
	@PostMapping("/insertar")
	public JsonResponse AgregarUsuario(@RequestBody Persona persona) {
		jsonResponse= new JsonResponse();
		BCryptPasswordEncoder pe = new BCryptPasswordEncoder();
		persona.getUsuario().setPass(pe.encode(persona.getUsuario().getPass()));
		
		boolean inserted;
		inserted= usuarioService.insert(persona);
		jsonResponse.respuestaInsertar(inserted);
		
		return jsonResponse;
	}
	@GetMapping("/informacion")
	public String obtenerUsuario(@RequestParam(name="id")Integer idUsuario, Model model) {
		model.addAttribute("usuarioRequerido",usuarioService.getById(idUsuario));
		return renderizarPagina();
	}
	@ResponseBody
	@PostMapping("/modificar")
	public JsonResponse modificarUsuario(@RequestParam(name="id")Integer idUsuario,@RequestBody Persona persona) {
		jsonResponse= new JsonResponse();
		persona.setIdPersona(usuarioService.getById(idUsuario).getIdPersona());
		persona.getUsuario().setIdUsuario(idUsuario);
		if(!persona.getUsuario().getPass().equals(usuarioService.getById(idUsuario).getUsuario().getPass())) {
			BCryptPasswordEncoder pe = new BCryptPasswordEncoder();
			persona.getUsuario().setPass(pe.encode(persona.getUsuario().getPass()));
		}
		boolean modified;
		modified= usuarioService.modify(persona);
		jsonResponse.respuestaModificar(modified);
		
		return jsonResponse;
	}
	
}
