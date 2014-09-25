/* global Chart */
angular.module('onlineResume.contact', [])

.controller('ContactController', function($scope) {
   	"use strict";

   	// TODO replace with proper angular js code
	$('#contact').submit(function(){
		var fromData = $('#contact').serialize();
		$(document.body).on('click', '#closebtn', function(){
			$('#contact-confirm').remove();
		});
		$.ajax({
			type: "POST",
			url: "contact.php",
			data: fromData,
			success : function( data ) {
				alert('Your Message Sent successfully');
			},
			error   : function( xhr, err ) {
				alert(fromData);     
			}
		});
		
		return false;
	});
   	
})

;	
