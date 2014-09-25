angular.module('onlineResume.client', [])

.controller('ClientController', function($scope) {
   	"use strict";

   	// TODO replace with proper angular js code
   	
	if ($(window).width() <= 992) {
		$('.more.first').hide();
		$('.more.second').show();
	} else {
		$('.more.second').hide();
		$('.more.first').show();
	}

	$('.more').on('click', function() {
		$('#clients .right').addClass('expand');
		// $('.more').hide();
		$('#less').show();
		$('#clients .left').css('margin-left','-300%');
		$('.container > .show-hide').delay('600').slideDown();
		
		var x = 800;
		$('#short').nextAll('.c-logo').each(function() {
			$(this).delay(x).fadeIn(600);
			x = x+20;
		});
		
		if ($(window).width() <= 992) {
			$('.more.first').hide();
			$('.more.second').hide();
		}
	});

    $('#less').click(function(){
		$('#clients .right').removeClass('expand');
		$('.more').show();
		$('#less').hide();
		$('#clients .left').css('margin-left','0');
		$('#short').nextAll('.c-logo').fadeOut(200);
		$('.container > .show-hide').slideUp('slow');
		$('.left > h3').css('display','block');
		$('.left > h4').css('display','block');
		
		if ($(window).width() <= 992) {
			$('.more.second').show();
			$('.more.first').hide();
		} else {
			$('.more.second').hide();
			$('.more.first').show();
		}
    });

    $('#short').nextAll('.c-logo').hide();
   	
})

;		
