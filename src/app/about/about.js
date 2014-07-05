angular.module('onlineResume.about', []);

angular.module('onlineResume.about').controller('AboutController', [ '$scope', function AboutController($scope) {
   	"use strict";
   	
   	$scope.general = {
   		  "firstName": "Arnaud",
   		  "lastName": "Pourbaix",
   		  "age": 38,
   		  "mail": "pourbaix.arnaud@gmail.com",
   		  "phone": "0626122768",
   		  "function": "Expert technique JEE/Javascript, Lead développeur",
   		  "description" : "J'ai travaillé pendant 15 ans dans plusieurs sociétés de services où j'ai touché à bon nombre de technologies: NSDK, PL/SQL, .NET, JEE, PHP, VB...<br/>" +
   		  		"A partir de 2010, je me suis spécialisé en JEE pour acquérir une véritable expertise dans une technologie moderne et évolutive.<br/>" + 
   		  		"En 2012, je me suis fortement intéressé au javascript parce qu'il devient de plus en plus incontournable et des librairies comme Angular ou jQuery apportent beaucoup dans les projets.<br/>" +
   		  		"Je travaille en portage salariale depuis 2015 en ciblant des missions d'expetise JEE/Javascript."
   	};
   	 
} ]);		
