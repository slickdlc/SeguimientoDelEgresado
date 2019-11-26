package pe.edu.udaff.configurations;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import pe.edu.udaff.entities.Perfil;
import pe.edu.udaff.entities.Permiso;
import pe.edu.udaff.service.PerfilService;

@Configuration
@EnableWebSecurity
//Para integration tests
//@Profile("!test")
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
	@Autowired
	private AccessDeniedHandler accessDeniedHandler;
	@Autowired
	private UserDetailsService userDetailsService;
	@Autowired
	private PerfilService perfilService;

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService).passwordEncoder(new BCryptPasswordEncoder());
	}
	private void configureUrls(HttpSecurity http) {
//		try {
//			List<Perfil> perfiles=perfilService.getAll();
//			System.out.println("Aca inicia");
//			for(int i=0; i<perfiles.size();i++) {
//				Set<Permiso> permisos= perfiles.get(i).getPermisos();
//				for (Permiso p : permisos) {
//					http
//					.authorizeRequests()
//						.antMatchers(p.getOpcion().getSubmodulo().getUrl()).hasAuthority(perfiles.get(i).getNombre());
//						System.out.println(perfiles.get(i).getNombre()+" en: "+p.getOpcion().getSubmodulo().getUrl());
//				}
//			}
//			System.out.println("Aca termina");
//		}catch(Exception e) {
//			System.out.println("Error en:"+e.getMessage());
//		}
	}
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		configureUrls(http);
		http
		.authorizeRequests()
			.antMatchers("/admin/usuario").hasAnyRole("ADMIN")
			.antMatchers("/admin/egresado").hasAnyRole("ADMIN","SDE","EGRESADO")
			.antMatchers("/admin/noticia").hasAnyRole("ADMIN","SDE")
			.antMatchers("/admin/propuesta").hasAnyRole("ADMIN","SDE","EGRESADO")
			.antMatchers("/admin/miperfil").hasAnyRole("EGRESADO")
			.antMatchers("/fa/**").permitAll()
			.antMatchers("/private/css/**").permitAll()
			.antMatchers("/private/img/**").permitAll()
			.anyRequest().authenticated()
			.and()
		.formLogin()
			.loginPage("/login")
			.usernameParameter("user")
			.passwordParameter("pass")
			.defaultSuccessUrl("/admin/home/",true).permitAll()
			.failureUrl("/login?error").permitAll()
			.and()
		.logout()
			.invalidateHttpSession(true)
			.clearAuthentication(true)
			.logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
			.logoutSuccessUrl("/login?logout").permitAll()
			.deleteCookies("JSESSIONID")
			.and()
		.exceptionHandling()
			.accessDeniedHandler(accessDeniedHandler)
			.and()
		.csrf().ignoringAntMatchers("/registro");
	}

}