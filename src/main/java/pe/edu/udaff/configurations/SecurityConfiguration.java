package pe.edu.udaff.configurations;

import java.util.List;

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

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		List<Perfil> perfiles=perfilService.getAll();
		for(int i=0; i<perfiles.size();i++) {
			for(int j=0; j<perfilService.getAllPermisosByPerfil(perfiles.get(i).getIdPerfil()).size();j++) {
//				http
//				.authorizeRequests()
//					.antMatchers("").hasRole(perfiles.get(i).getNombre());
			}
		}
		http
		.authorizeRequests()
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