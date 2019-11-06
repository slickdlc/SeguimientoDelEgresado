package pe.edu.udaff.controllers;

import java.net.MalformedURLException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import facebook4j.Facebook;
import facebook4j.FacebookException;
import facebook4j.FacebookFactory;
import facebook4j.PageSetting;
import facebook4j.ResponseList;
import facebook4j.auth.AccessToken;
import pe.edu.udaff.entities.Egresado;
import pe.edu.udaff.entities.Noticia;
import pe.edu.udaff.service.EgresadoService;
import pe.edu.udaff.service.MailService;
import pe.edu.udaff.service.NoticiaService;
import pe.edu.udaff.util.JsonResponse;

@Controller
@RequestMapping("/admin/noticia")
public class NoticiaController {
	@Autowired
	private MailService mailService;
	@Autowired
	private EgresadoService egresadoService;
	@Autowired
	private NoticiaService noticiaService;
	private JsonResponse jsonResponse;

	@GetMapping()
	public String renderizarPagina() {
		return "views/admin/pages/usuario";
	}

	@ModelAttribute
	public void addAttributes(Model model) {
		model.addAttribute("noticias", noticiaService.getAll());
	}

	@ResponseBody
	@PostMapping("/insertar")
	public JsonResponse Agregar(@RequestBody Noticia noticia) {
		jsonResponse = new JsonResponse();
//		BCryptPasswordEncoder pe = new BCryptPasswordEncoder();
//		egresado.setPass(pe.encode(egresado.getPass()));
		noticia.setEstado(Byte.parseByte("1"));
		boolean inserted;
		inserted = noticiaService.insert(noticia);
		jsonResponse.respuestaInsertar(inserted);

		return jsonResponse;
	}

	@GetMapping("/informacion")
	public String obtener(@RequestParam(name = "id") Integer idNoticia, Model model) {
		model.addAttribute("egresadoRequerido", noticiaService.getById(idNoticia));
		return renderizarPagina();
	}

	@ResponseBody
	@PostMapping("/modificar")
	public JsonResponse modificar(@RequestParam(name = "id") Integer idNoticia, @RequestBody Noticia noticia) {
		jsonResponse = new JsonResponse();
		noticia.setIdNoticia(idNoticia);
		boolean modified;
		modified = noticiaService.modify(noticia);
		jsonResponse.respuestaModificar(modified);

		return jsonResponse;
	}

	@ResponseBody
	@PostMapping("/eliminar")
	public JsonResponse eliminar(@RequestParam(name = "id") Integer idNoticia) {
		jsonResponse = new JsonResponse();
		Noticia noticia = noticiaService.getById(idNoticia);
		noticia.setEstado(Byte.parseByte("0"));
		noticiaService.modify(noticia);
		jsonResponse.respuestaEliminar();
		return jsonResponse;
	}

	public boolean notificarEnFacebook(String message) throws FacebookException, MalformedURLException {
		String appId = "2504347369798635";
		String appSecret = "b4dabef36e88eb545bdb5cc498437fc1";
		String token = "EAAjlsM9eZBZBsBAHYLJmtEYww8wuGYSNuJS2yIhe4Wew01LP2nOvrCe1m4BYZBQzZChP8WsNkrXZCYc82R6ZCS0mblQsT4fowGGh6HLxVc3zaEJ2VFhjLwN2w3JGvMZBNNWAAIbqTI1ZC072zjh5bZBZBQbmV34MvYyq2jLZAWqZBrwPJyia94qRa9SrYK7wumZBHO5YZD";
		Facebook facebook = new FacebookFactory().getInstance();
		facebook.setOAuthAppId(appId, appSecret);
		facebook.setOAuthAccessToken(new AccessToken(token, null));
		String a=facebook.postStatusMessage(message+". Ingresa a la página de egresados para más informacion!");
		System.out.println(a);
		ResponseList<PageSetting> list = facebook.getPageSettings();
		System.out.println("posted");
		return true;
	}
	public boolean enviarEmailATodosLosEgresados(String message) {
		mailService.initMailSender();
		for(Egresado e:egresadoService.getAll()) {
			if(e.getEmail()!=null) {
				mailService.sendSimpleMessage(e.getEmail(), "Seguimiento del Egresado", message);
			}
		}
		return true;
	}
}
