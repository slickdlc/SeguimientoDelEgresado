package pe.edu.udaff.controllers;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import pe.edu.udaff.entities.Noticia;
import pe.edu.udaff.service.NoticiaService;

@Controller
@RequestMapping("/admin/home")
public class HomeController {
	@Autowired
	private NoticiaService noticiaService;
	
	@GetMapping()
	public String home(Model model) {
		model.addAttribute("title","Inicio | SGSE");
		
		return "views/admin/pages/home";
	}
	@ModelAttribute
	public void addAttributes(Model model) {
		List<Noticia> lista = noticiaService.getAllPublic();
		Collections.sort(lista, new Comparator<Noticia>() {
			@Override
			public int compare(Noticia n1, Noticia n2) {
				return n1.getIdNoticia().compareTo(n2.getIdNoticia()) * (-1);
			}
		});
		model.addAttribute("noticias", lista);
	}
}
