(function(){
	"use strict";

	document.addEventListener('DOMContentLoaded',function(){

		var inputFiltro= document.getElementById('inputFiltro');
		var inputNombreFiltro= document.getElementById('nombreCliente');
		var inputDireccionCliente= document.getElementById('direccionCliente');

		//evento para filtrar la lista
		var data=document.getElementsByClassName('listaFiltro')[0];
		data=data.getElementsByTagName('li');
		for (var i = 0; i < data.length; i++) {
			data[i].style.display="block";
			if(i>4)
				data[i].style.display="none";
			}
		inputFiltro.addEventListener('keyup',filtrar);
		inputNombreFiltro.addEventListener('keyup',filtrar);
		function filtrar(event){
			var filtro=event.target.value.toLowerCase().trim();
			
			if(event.key!=" "){				
				var contador=0;
				var contadorFilas=0;
				for (var i = 0; i < data.length; i++) {
				
						
						var columna1=data[i].getElementsByTagName('p')[0].innerHTML.toLowerCase();
						var columna2=data[i].getElementsByTagName('p')[1].innerHTML.toLowerCase();
						if(contadorFilas<5){
								if(columna1.indexOf(filtro)==-1 && columna2.indexOf(filtro)==-1){
									data[i].style.display="none";
									contador++;
								}
								else{
									data[i].style.display="block";
									contadorFilas++;
								}
						}
						else{
							data[i].style.display="none";
							contador++;
						}
						if(contador==data.length){
							dataFiltro.style.display="none";
						}
						else{
							dataFiltro.style.display="block";
						}
					}
				
				
			}
		}


		var listaIsFocus=false;
		dataFiltro.addEventListener('mouseover',isHover);
		dataFiltro.addEventListener('mouseout',isntHover);
		function isHover(event){
			listaIsFocus=true;
		}
		function isntHover(event){
			listaIsFocus=false;
		}
		//eventos para mostrar la lista 
		inputFiltro.addEventListener('focus',mostrarDivFiltro);
		inputNombreFiltro.addEventListener('focus',mostrarDivFiltro);
	
		function mostrarDivFiltro(event){
			dataFiltro.style.display="block";
		}
		inputFiltro.addEventListener('blur',ocultarDivFiltro)
		function ocultarDivFiltro(event){
			if(!listaIsFocus)
			     dataFiltro.style.display="none";

		}
		//Evento para clickear un elemento de la lista y que muestre en el input
		var ul=document.getElementsByClassName('listaFiltro')[0];

		var listaLi=ul.getElementsByTagName('li');
		for(var i=0; i<listaLi.length;i++){
			listaLi[i].addEventListener('click',mostrarValorEnInput);
		}
		function mostrarValorEnInput(event){
			var aux=event.target;
			var id;
			var nombre;
			var direccion;
			if(aux.tagName=="P"){
				aux=aux.parentElement;
			}
			if(aux.tagName=="LI"){
				id=aux.lastElementChild;
				direccion=aux.getElementsByClassName('dataFiltroDireccion')[0];
				nombre=aux.firstElementChild;
			}
			inputFiltro.value=id.innerText;
			dataFiltro.style.display="none";
			nombreCliente.value=nombre.innerText;
			inputDireccionCliente.value=direccion.innerText;
			
		}
		});
})();