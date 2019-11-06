package pe.edu.udaff.controllers;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping({"/","/login"})
public class LoginController {
	
	@GetMapping()
	public String renderizarLogin(){
		BCryptPasswordEncoder pe= new BCryptPasswordEncoder();
		return "views/login/index";
	}
}
