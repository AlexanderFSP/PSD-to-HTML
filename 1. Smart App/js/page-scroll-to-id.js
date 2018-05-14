$(document).ready(function(){
	/**
	 * 	@description Плавный скролл после нажатия на якорную ссылку
	 */
	$("#menu").on("click","a", function (event) {
		event.preventDefault();
		var id  = $(this).attr('href'), top = $(id).offset().top;
		$('body,html').animate({scrollTop: top}, 1500);
	});

	/**
	 * 	@description Изменение фона заголовочного меню при скроллинге страницы
	 */
	$(document).scroll(function() {
		var documentScrollTop = $(document).scrollTop();
		if (documentScrollTop > $('.header-menu').height()) {
			$('.header-menu').css('background-color', 'rgba(210, 217, 232, 0.75)');
		} else {
			$('.header-menu').css('background-color', '#fff');
		}
	  });	  
});