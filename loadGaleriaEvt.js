var div_GALERIA = $("#setGalery");

function loadGaleriaEvt(){
	/*$("#setGalery").css("display","block");*/

	$.ajax({
		type: "POST",
		url: "funciones/devGaleriaEvt.php",
		data: {"nroImages":0},
		dataType: 'json',
		success: function (data) {
			if(data.tagImages.length!=0){
				div_GALERIA.data("images",data.nroImages);
				div_GALERIA.data("final",data.final);
				//div_GALERIA.data("direc",data.direc);
				div_GALERIA.html(data.tagImages);
				$("#nextImgs").fadeIn();
				/*$("h2").html(titulo);
				$("h2+button").removeClass("hide");*/

			}
			else
				div_GALERIA.data("images",0).html('<div id="vacia" class="text-center small-12 column ft_bl ft_opensans">Aun no hay imágenes para mostrar</div>');
		}
	});

}

$(window).scroll(function(){
	var directorio = div_GALERIA.data("direc");
	var nroImages = div_GALERIA.data("images");
	if(div_GALERIA.data("final")=="false"){
		if( $(window).scrollTop() == ($(document).height() - $(window).height()) ){
			addImgGalery(nroImages);
		}
	}
	else
		$("#nextImgs").fadeOut();
});

function addImgGalery(nroImg){
	$.ajax({
		type: "POST",
		url: "funciones/devGaleriaEvt.php",
		data: {"nroImages":nroImg},
		dataType: 'json',
		success: function (data) {
			if(data.tagImages.length!=0){
				div_GALERIA.data("images",data.nroImages).append(data.tagImages);
				div_GALERIA.data("final",data.final);
				$("#nextImgs").fadeIn();
			}
		}
	});
}

/**
 * ********************************************/
$(document).keyup(function(e) {
	if(e.keyCode == 27) {
		if($('.vidrio').css("display")=="block"){
			hideVidrio();
		}
	}
});
$('.vidrio').click(function(){
	hideVidrio();
});
function hideVidrio(){
	$('.vidrio').children().remove();
	$('.vidrio').fadeOut("fast");
}
function showImg(rutaImg){
	var wh = $(window).height();
	$(".vidrio").fadeIn("fast",function(){
		$(this).append("<img />");
		$(this).find("img").load(function() {
			var ih = $(this).height();
			var mt = (wh - ih)/2;
			$(this).css("margin-top",mt+"px");
		}).attr("src",rutaImg);
	});
}