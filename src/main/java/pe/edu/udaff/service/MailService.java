package pe.edu.udaff.service;

public interface MailService {
	public void initMailSender();
	public void sendSimpleMessage(String to, String subject, String text);
}
