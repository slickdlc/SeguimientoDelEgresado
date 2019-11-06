package pe.edu.udaff.util;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class JsonResponse {
	
	private boolean estado;
    private String paginaRedireccion;
    private List<String> mensajesRepuesta;
    private Map<String, Object> extraData;
	public static String insertSuccess = "Se registró correctamente.";
    public static String updateSuccess = "Se modificó correctamente.";
    public static String changeStateSuccess = "Se cambió el estado correctamente.";
    public static String deleteSuccess = "Se eliminó correctamente.";
    public static String insertFailure= "No se ha insertado, intente nuevamente.";
    public static String updateFailure="No se ha modificado, intente nuevamente";

    public void respuestaInsertar(boolean success){
        this.estado = success;
        this.mensajesRepuesta.add(success? insertSuccess:insertFailure);
    }
    
    public void respuestaModificar(boolean success){
        this.estado = success;
        this.mensajesRepuesta.add(success? updateSuccess:updateFailure);
    }
   
    public void respuestaEliminar(){
        this.estado = true;
        this.mensajesRepuesta.add(deleteSuccess);
    }
    
    public void respuestaCambiarEstado(){
        this.estado = true;
        this.mensajesRepuesta.add(changeStateSuccess);
    }
    
    public JsonResponse(){
        estado = false;
        paginaRedireccion = "";
        mensajesRepuesta = new ArrayList<String>();
    }   
    
    public JsonResponse(boolean estado, List<String> mensajesRepuesta) {
        this.estado = estado;
        this.mensajesRepuesta = mensajesRepuesta;
        this.paginaRedireccion = "";
    }    
    
    public boolean isEstado() {
        return estado;
    }

    public void setEstado(boolean estado) {
        this.estado = estado;
    }

    public String getPaginaRedireccion() {
        return paginaRedireccion;
    }

    public void setPaginaRedireccion(String paginaRedireccion) {
        this.paginaRedireccion = paginaRedireccion;
    }

    public List<String> getMensajesRepuesta() {
        return mensajesRepuesta;
    }

    public void setMensajesRepuesta(List<String> mensajesRepuesta) {
        this.mensajesRepuesta = mensajesRepuesta;
    }
    public Object getExtraData() {
		return extraData;
	}

	public void setExtraData(Map<String, Object> extraData) {
		this.extraData = extraData;
	}

}
