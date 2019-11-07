$.each($('.noticia'), function( index, value ) {
  $(value).addClass(getbg());
});
function getbg() {
	var n=getRandom();
	var bg='';
	switch(n){
	case 1:bg=' bg-primary ';break;
	case 2:bg=' bg-rose ';break;
	case 3:bg=' bg-info ';break;
	case 4:bg=' bg-success';break;
	}
	return bg;
}
function getRandom() {
	 return Math.floor(Math.random() * (5 - 1)) + 1;
}