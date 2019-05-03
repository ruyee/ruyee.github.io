jQuery(document).on('ready', function ($) {
	"use strict";

	/*--------------------------
	    SCROLLSPY ACTIVE
	---------------------------*/
	$('body').scrollspy({
		target: '.bs-example-js-navbar-scrollspy',
		offset: 50
	});


	/*--------------------------
	    STICKY MAINMENU
	---------------------------*/
	$("#mainmenu-area").sticky({
		topSpacing: 0
	});


	/*-----------------------------
	    SLIDER ACTIVE
	------------------------------*/
	var mySlider = $('.pogoSlider').pogoSlider({
		pauseOnHover: false
	}).data('plugin_pogoSlider');


	/*--------------------------
	   HOME PARALLAX BACKGROUND
	----------------------------*/
	$(window).stellar({
		responsive: true,
		positionProperty: 'position',
		horizontalScrolling: false
	});


	/*---------------------------
	    SMOOTH SCROLL
	-----------------------------*/
	$('a.scrolltotop, .slider-area h3 a, .navbar-header a, ul#nav a').on('click', function (event) {
		var id = $(this).attr("href");
		var offset = 40;
		var target = $(id).offset().top - offset;
		$('html, body').animate({
			scrollTop: target
		}, 1500, "easeInOutExpo");
		event.preventDefault();
	});


	/*----------------------------
	    SCROLL TO TOP
	------------------------------*/
	$(window).on("scroll", function () {
		var $totalHeight = $(window).scrollTop();
		var $scrollToTop = $(".scrolltotop");
		if ($totalHeight > 300) {
			$scrollToTop.fadeIn();
		} else {
			$scrollToTop.fadeOut();
		}
		if ($totalHeight + $(window).height() === $(document).height()) {
			$scrollToTop.css("bottom", "90px");
		} else {
			$scrollToTop.css("bottom", "20px");
		}
	});


	/*---------------------------
	    TESTMONIAL SLIDER
	-----------------------------*/
	$('.testmonial-slider').owlCarousel({
		merge: true,
		video: true,
		items: 1,
		smartSpeed: 2000,
		loop: true,
		nav: false,
		navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
		autoplay: true,
		autoplayTimeout: 3000,
		margin: 15,
		responsiveClass: true,
		responsive: {
			0: {
				items: 1
			},
			600: {
				items: 1
			},
			1000: {
				items: 2
			},
			1200: {
				items: 3
			}
		}
	});


	/*---------------------------
        MICHIMP INTEGRATION
    -----------------------------*/
	$('#mc-form, #mc-form2').ajaxChimp({
		url: 'http://intimissibd.us14.list-manage.com/subscribe/post?u=a77a312486b6e42518623c58a&amp;id=4af1f9af4c', //Set Your Mailchamp URL
		callback: function (resp) {
			if (resp.result === 'success') {
				$('.subscriber-form input, .subscriber-form button').hide();
				$('.subscriber-form form').css('border', 'none');
			}
		}
	});


	/*----------------------------
	    INSTAGRAM FEED ACTIVE
	-----------------------------*/
	var feed = new Instafeed({
		get: 'user',
		userId: 3287251940,
		accessToken: '3287251940.4ac71b3.d88be01ca9c94e2e8a2d923fe0a5169e',
		target: 'instagram',
		limit: 6, //max 60 images..
		resolution: 'standard_resolution',
		after: function () {
			var el = document.getElementById('instagram');
			if (el.classList)
				el.classList.add('show');
			else
				el.className += ' ' + 'show';
		}
	});
	feed.run();


	/*--------------------------
	    ACTIVE WOW JS
	----------------------------*/
	new WOW().init();


}(jQuery));


jQuery(window).on('load', function () {

	/*--------------------------
	    PRE LOADER
	----------------------------*/
	$(".preeloader").fadeOut(1000);
});
