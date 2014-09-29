$(window).bind("load", function() {
   $('#loader').remove();
   $('html').css({'overflow' : 'auto'});
});

$(function() {
	"use strict"; 

	var winHeight = $(window).height();
	var winWidth = $(window).width();
	
	if (winWidth <= 1024) {
		// remove javascript and css files related to uikit
		// TODO test if it works properly !
		// TODO test what happens if resize down then up
		$('.uikit').remove();
	}

	
	// MENU FIXED START
	var offset = winHeight;
	var duration = 500;
	$(window).scroll(function() {
		if ($(this).scrollTop() > offset) {
			$('.fixed-nav').addClass('fixed');
		} else {
			$('.fixed-nav').removeClass('fixed');
		}
	});
	// MENU FIXED END


	// MENU FOR MOBILE AND SMALL DEVICES START
	$('#mobilenav .nav').height(winHeight - 70);
	$('#mobile-nav-trigger').click (function() {
		$('#mobilenav').toggleClass('fixed-m-nav');
		$('#body-wrapper').toggleClass('body-wrapper-trigger');
	});
	$('#body-wrapper').click(function() {
		$('#mobilenav').removeClass('fixed-m-nav');
		$('#body-wrapper').removeClass('body-wrapper-trigger');
	});
	// MENU FOR MOBILE AND SMALL DEVICES END

	
	// HOME SECTION START
	$('.homeoverlay').css('height', winHeight);
	$('.homeoverlay .home-part .item').css('height', winHeight);

	if (winHeight > 360) {
		$('.homeoverlay .item .slider-part').css('height', winHeight / 100 * 80);
	} else {
		$('.homeoverlay .item .slider-part').css('height', winHeight);
	}
	
	$(window).resize(function() {
		$('.homeoverlay').css('height', winHeight);
		$('.homeoverlay .home-part .item').css('height', winHeight);
		if (winHeight > 360) {
			$('.homeoverlay .item .slider-part').css('height', winHeight / 100 * 80);
		} else {
			$('.homeoverlay .item .slider-part').css('height', winHeight);
		}
	});
	// HOME SECTION END

    
	// SMOTHSCROLL START
	var scrollOffset = function() {
		if ($(window).width() > 992) { //offset value
			return 65;
		} else {
			return 0;
		}
	};

	$('.scroll').on('click',function(e) {
		e.preventDefault();
		$('html, body').stop().animate({
            'scrollTop': $($(this).attr('href')).offset().top - scrollOffset()
		}, 1500, 'easeInOutCirc', function() {});

		$('#mobilenav').removeClass('fixed-m-nav');
		$('#body-wrapper').removeClass('body-wrapper-trigger');
		$('section').removeClass('blur');
    });
	// SMOTHSCROLL END


}); // DOCUMENT.READY END


// CSS3 AMINATION TRIGGER FOR SLIDER START
$('#home-slider').bind('slide.bs.carousel', function (e) {
	$('#home-slider .slideInLeftTrigger').removeClass('slideInLeft');
	$('#home-slider .fadeInRightBigTrigger').removeClass('fadeInRightBig');
});

$('#home-slider').bind('slid.bs.carousel', function (e) {
	$('#home-slider .slideInLeftTrigger').addClass('slideInLeft');
	$('#home-slider .fadeInRightBigTrigger').addClass('fadeInRightBig');
});
// CSS3 AMINATION TRIGGER FOR SLIDER END