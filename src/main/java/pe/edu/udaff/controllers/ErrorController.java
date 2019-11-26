package pe.edu.udaff.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
@Controller
public class ErrorController {

	@GetMapping("/403")
	public String render() {
		return "views/admin/error/403";
	}
}
