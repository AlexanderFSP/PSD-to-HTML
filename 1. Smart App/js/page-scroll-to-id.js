/**
 * 	@description Плавный скролл после нажатия на якорную ссылку
 */
$(document).ready(function(){
	$("#menu").on("click","a", function (event) {
		event.preventDefault();
		var id  = $(this).attr('href'), top = $(id).offset().top;
		$('body,html').animate({scrollTop: top}, 1500);
	});
});

/**
 *	 @description Изменение фона заголовочного меню при скроллинге страницы
 */
$(document).ready(function(){
	$(document).scroll(function() {
		var documentScrollTop = $(document).scrollTop();
		if (documentScrollTop > $('.header-menu').height()) {
			$('.header-menu').css('background-color', 'rgba(210, 217, 232, 0.75)');
		} else {
			$('.header-menu').css('background-color', '#fff');
		}
	});
});

/**
 *	 @description Добавление анимаций из библиотеки animate.js
 */
$(document).ready(function(){
	$(".animate__BounceInRight").animated("bounceInRight");
	$(".animate__BounceInLeft").animated("bounceInLeft");

	$("header i, footer i, #newsletter i").animated("bounceIn");
	$("#features-center i").animated("pulse infinite");
});