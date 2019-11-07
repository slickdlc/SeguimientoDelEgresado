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

import pe.edu.udaff.entities.Antecedentelaboral;
import pe.edu.udaff.entities.Egresado;
import pe.edu.udaff.entities.Primerempleo;
import pe.edu.udaff.entities.Usuario;
import pe.edu.udaff.service.EgresadoService;
import pe.edu.udaff.service.EmpleoService;
import pe.edu.udaff.util.JsonResponse;

@Controller
@RequestMapping("/admin/egresado")
public class EgresadoController {
	@Autowired
	private EgresadoService egresadoService;
	@Autowired
	private EmpleoService empleoService;
	private JsonResponse jsonResponse;

	@GetMapping()
	public String renderizarPagina() {
		return "views/admin/pages/egresado";
	}

	@ModelAttribute
	public void addAttributes(Model model) {
		model.addAttribute("egresados", egresadoService.getAll());
		model.addAttribute("sexos", egresadoService.getSexos());
		model.addAttribute("estadosciviles", egresadoService.getEstadosCiviles());
		model.addAttribute("departamentos", egresadoService.getDepartamentos());
		model.addAttribute("carreras", egresadoService.getCarreras());
		model.addAttribute("modalidades", egresadoService.getModalidades());
		model.addAttribute("situacionEgresados", egresadoService.getSituaciones());
		model.addAttribute("sectores", egresadoService.getSectores());
	}

	@ResponseBody
	@PostMapping("/cambiarEstado")
	public Byte cambiarEstado(@RequestParam(name = "id") Integer idEgresado) {
		Egresado egresado = egresadoService.getById(idEgresado);
		Byte estado = egresado.getPersona().getUsuario().getEstado();
		if (estado == 1)
			estado = 0;
		else
			estado = 1;
		egresado.getPersona().getUsuario().setEstado(estado);
		egresadoService.modify(egresado);
		return estado;
	}

	@ResponseBody
	@PostMapping("/insertar")
	public JsonResponse Agregar(@RequestBody Egresado egresado) {
		jsonResponse = new JsonResponse();
		BCryptPasswordEncoder pe = new BCryptPasswordEncoder();
		egresado.getPersona().getUsuario().setPass(pe.encode(egresado.getPersona().getUsuario().getPass()));

		boolean inserted;
		inserted = egresadoService.insert(egresado);
		jsonResponse.respuestaInsertar(inserted);

		return jsonResponse;
	}

	@GetMapping("/informacion")
	public String obtener(@RequestParam(name = "id") Integer idEgresado, Model model) {
		model.addAttribute("egresadoRequerido", egresadoService.getById(idEgresado));
		return renderizarPagina();
	}

	@ResponseBody
	@PostMapping("/modificar")
	public JsonResponse modificar(@RequestParam(name = "id") Integer idEgresado, @RequestBody Egresado egresado) {
		jsonResponse = new JsonResponse();
		Usuario usuario = egresadoService.getById(idEgresado).getPersona().getUsuario();
		egresado.setIdEgresado(idEgresado);
		egresado.getPersona().getUsuario().setIdUsuario(usuario.getIdUsuario());
		if (!egresado.getPersona().getUsuario().getPass().equals(usuario.getPass())) {
			BCryptPasswordEncoder pe = new BCryptPasswordEncoder();
			egresado.getPersona().getUsuario().setPass(pe.encode(egresado.getPersona().getUsuario().getPass()));
		}
		boolean modified;
		modified = egresadoService.modify(egresado);
		jsonResponse.respuestaModificar(modified);

		return jsonResponse;
	}

	@ResponseBody
	@PostMapping("/insertarAL")
	public JsonResponse insertarAntecedentelaboral(@RequestBody Antecedentelaboral antecedentelaboral) {
		jsonResponse = new JsonResponse();
		boolean modified;
		modified = empleoService.insert(antecedentelaboral);
		jsonResponse.respuestaInsertar(modified);
		return jsonResponse;
	}

	@GetMapping("/antecedente")
	public String obtenerAntecedente(@RequestParam(name = "id") Integer idAntecedentelaboral, Model model) {
		model.addAttribute("antecedenteRequerido", empleoService.getById(idAntecedentelaboral));
		return renderizarPagina();
	}

	@ResponseBody
	@PostMapping("/modificarAL")
	public JsonResponse modificarAntecedentelaboral(@RequestParam(name = "id") Integer idAntecedentelaboral,
			@RequestBody Antecedentelaboral antecedentelaboral) {
		jsonResponse = new JsonResponse();
		antecedentelaboral.setIdAntecedenteLaboral(idAntecedentelaboral);
		boolean modified;
		modified = empleoService.modify(antecedentelaboral);
		jsonResponse.respuestaModificar(modified);
		return jsonResponse;
	}
	@ResponseBody
	@PostMapping("/eliminarAL")
	public JsonResponse eliminarAntecedentelaboral(@RequestParam(name = "id") Integer idAntecedentelaboral) {
		jsonResponse = new JsonResponse();
		Antecedentelaboral al=empleoService.getById(idAntecedentelaboral);
		al.setEstado(Byte.parseByte("0"));
		boolean modified;
		modified = empleoService.modify(al);
		jsonResponse.respuestaModificar(modified);
		return jsonResponse;
	}
//	@ResponseBody
//	@PostMapping("/insertarPE")
//	public JsonResponse insertarPrimerempleo(@RequestBody Primerempleo primerempleo) {
//		jsonResponse= new JsonResponse();
//		boolean modified;
//		modified= empleoService.insert(primerempleo);
//		jsonResponse.respuestaInsertar(modified);
//		
//		return jsonResponse;
//	}
//	@ResponseBody
//	@PostMapping("/modificarPE")
//	public JsonResponse modificarPrimerempleo(@RequestBody Primerempleo primerempleo) {
//		jsonResponse= new JsonResponse();
//		boolean modified;
//		modified= empleoService.modify(primerempleo);
//		jsonResponse.respuestaModificar(modified);
//		
//		return jsonResponse;
//	}
}
