/**
 *	 @description Добавление анимаций из библиотеки animate.js
 */
$(document).ready(function(){
	$(".logo__coins").animated("bounce infinite");
});

/**
 *	 @description Модальное окно с импортированным видео
 */
$(document).ready(function() {
	var $videoSrc;  
	$('.video-btn').click(function() {
		$videoSrc = $(this).data( "src" );
	});

	$('#myModal').on('shown.bs.modal', function (e) {
		$("#video").attr('src', $videoSrc + "?rel=0&amp;showinfo=0&amp;modestbranding=1&amp;autoplay=1" ); 
	});
	  
	$('#myModal').on('hide.bs.modal', function (e) {
		$("#video").attr('src', $videoSrc); 
	});
});