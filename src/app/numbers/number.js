angular.module('onlineResume.number', [])

.controller('NumberController', function($scope) {
   	"use strict";
   	
    $('#happyness').waypoint(function() {
    	$({countNum: $('#online').text()}).animate({countNum: $('#online').attr('data-target')}, {
			duration: 5000,
			easing:'linear',
			step: function() {
				$('#online').text(Math.floor(this.countNum));
			},
			complete: function() {
				$('#online').text(this.countNum);
			}
		});
		
    	$({countNum: $('#clients-no').text()}).animate({countNum: $('#clients-no').attr('data-target')}, {
			duration: 5000,
			easing:'linear',
			step: function() {
				$('#clients-no').text(Math.floor(this.countNum));
			},
			complete: function() {
				$('#clients-no').text(this.countNum);
			}
    	});
		
    	$({countNum: $('#projects-no').text()}).animate({countNum: $('#projects-no').attr('data-target')}, {
			duration: 5000,
			easing:'linear',
			step: function() {
				$('#projects-no').text(Math.floor(this.countNum));
			},
			complete: function() {
				$('#projects-no').text(this.countNum);
			}
    	});
		
    	$({countNum: $('#traveled').text()}).animate({countNum: $('#traveled').attr('data-target')}, {
			duration: 5000,
			easing:'linear',
			step: function() {
				$('#traveled').text(Math.floor(this.countNum));
			},
			complete: function() {
				$('#traveled').text(this.countNum);
			}
    	});
    }, { offset: $(window).height()});
   	
   	
})

;	
