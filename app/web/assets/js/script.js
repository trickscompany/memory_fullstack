var graphiques = ['carrot','fish','seedling', 'pepper-hot', 'lemon',  'leaf', 'apple-alt', 'hotdog', 'ice-cream', 'cheese'],
		ouvert = [],
		trouve = 0,
		temps = 0,
		$plateau = $('.plateau'),
		$zoneInfo = $('#zone-info'),
		$restart = $zoneInfo.find('.restart'),
		delais = 800,
		nbCartesJeux = graphiques.length,
		ticTac = new tictacRounded(),
		tictacReste = 120;
const test = graphiques.slice();
const ensemble = [...graphiques, ...test];
// Shuffle Fisher-Yates, c'est pas de moi.
function melange(cetableau) {
  var currentIndex = cetableau.length, temporaryValue, randomIndex;
	
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cetableau[currentIndex];
    cetableau[currentIndex] = cetableau[randomIndex];
    cetableau[randomIndex] = temporaryValue;
  }
  return cetableau;
}

// Initialsation du plateau
function initMemory() {
	$.ajax({
		method: "GET",
		url: "memory/lire/5"
	  })
		.done(function( msg ) {
			let texte = "";
			if(msg.length >0){
				texte += '<ul class="classement">';
				texte += '<li><span>Temps</span> '+' <span>Date</span></li>';
				texte += '</ul>';
				texte += '<ol class="classement">';
				let myJson = JSON.parse(msg);
				Object.entries(myJson).forEach(([key, value]) => {
					texte += '<li><span>'+value.temps+'</span> '+' <span>'+value.date_partie+'</span></li>';
				});
				texte += '</ol>';
			}
		  Swal.fire({
			allowEscapeKey: false,
			allowOutsideClick: false,
			heightAuto: false,
			customClass: {
				title: 'dude-title'
			},
			title: 'Voici les 5 meilleurs temps  de tous les temps.',
			html: texte,
			icon: 'info',
			confirmButtonColor: '#9BCB3C',
			confirmButtonText: 'Je veux jouer!'
		  });
		});
		
	ticTac.initSilent("tictac",0);
	var cartes = melange(ensemble);
  	$plateau.empty().removeClass('dirty');
  	trouve = 0;
	for (var i = 0; i < cartes.length; i++) {
		$plateau.append($('<li class="carte"><i class="fas fa-' + cartes[i] + '"></i></li>'));
	}
}

//Initialsation du plateau silencieuse, pour reset discretos le jeu :-)
function initMemorySilent() {
	ticTac.initSilent("tictac",0);
	var cartes = melange(ensemble);
  	$plateau.empty().removeClass('dirty');
  	trouve = 0;
	for (var i = 0; i < cartes.length; i++) {
		$plateau.append($('<li class="carte"><i class="fas fa-' + cartes[i] + '"></i></li>'));
	}
}
// Fin du jeu Gagne
function finMemory(temps) {
	$.ajax({
		method: "POST",
		url: "memory/ajouter",
		data: { temps: temps }
	  }).done(function( msg ) {
		Swal.fire({
			allowEscapeKey: false,
			allowOutsideClick: false,
			heightAuto: false,
			title: 'Youhou! C\'est gagné!',
			text: 'Tu as complété le jeu en ' + temps + ' secondes.\nBien joué!',
			icon: 'success',
			showCancelButton: true,
    		confirmButtonColor: '#9BCB3C',
    		cancelButtonColor: '#EE0E51',
			cancelButtonText: 'Annuler',
			confirmButtonText: 'Refaire une partie ?'
		}).then(function(isConfirm) {
			if (isConfirm.isConfirmed) {
				initMemory();
			}
		});
	  });
	
}
// Fin du jeu temps ecoule
function finMemoryPerdu(temps) {
	Swal.fire({
		allowEscapeKey: false,
		allowOutsideClick: false,
		heightAuto: false,
		title: 'Le temps imparti est écoulé!',
		text: 'C\'est perdu pour cette fois. Tu retentes ?',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#9BCB3C',
		confirmButtonText: 'Oui, refaire une partie!'
	}).then(function(isConfirm) {
		if (isConfirm.isConfirmed) {
			initMemory();
		}
	});
}
// Relancer le jeu => réinit de la partie
$restart.on('click', function() {
  Swal.fire({
    allowEscapeKey: false,
    allowOutsideClick: false,
	heightAuto: false,
    title: 'Tu es sur ?',
    text: "Tu vas tout perdre! C'est ton dernier mot ?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#9BCB3C',
    cancelButtonColor: '#EE0E51',
	cancelButtonText: 'Annuler',
    confirmButtonText: 'J\'aime le risque, OUI!'
  }).then(function(isConfirm) {
    if (isConfirm.isConfirmed) {
      initMemory();
    }
  })
});

// carte flip
$plateau.on('click', '.carte:not(".ok, .ouvert")', function() {
	if($('.montre').length > 1) { return true; }
	
	let $this = $(this);
	let carte = $(this).html();
  	$this.addClass('ouvert montre');
	ouvert.push(carte);
	if(!$plateau.hasClass('dirty')){
		$plateau.addClass('dirty');
		ticTac.init("tictac",tictacReste);
	}
	// Compare with ouvert carte
  if (ouvert.length > 1) {
    if (carte === ouvert[0]) {
      $plateau.find('.ouvert').addClass('ok animated infinite rubberBand');
      setTimeout(function() {
        $plateau.find('.ok').removeClass('ouvert montre animated infinite rubberBand');
      }, delais);
      trouve++;
    } else {
      $plateau.find('.ouvert').addClass('notok animated infinite wobble');
			setTimeout(function() {
				$plateau.find('.ouvert').removeClass('animated infinite wobble');
			}, delais / 1.5);
      setTimeout(function() {
        $plateau.find('.ouvert').removeClass('ouvert montre notok animated infinite wobble');
      }, delais);
    }
    ouvert = [];
  }
	
	// Partie terminée si toutes les cartes sont trouvées
	if (nbCartesJeux === trouve) {
		clearInterval(ticTac.interval);
		setTimeout(function() {
			finMemory(temps);
		}, 500);
  	}
});



function tictacRounded() {
	var self = this;

	this.secondes = 0;
	this.compte = 0;
	this.degrees = 0;
	this.interval = null;
	this.tictacContainer = null;
	this.nombre = null;
	this.slice = null;
	this.part = null;
	this.partRight = null;
	this.partLeft = null;
	this.quarter = null;

	this.init = function(e, s) {
		self.tictacContainer = $("#" + e);
		self.tictacContainer.find('.n').html(tictacReste);
		
		self.nombre = self.tictacContainer.find(".n");
		self.slice = self.tictacContainer.find(".slice");
		self.part = self.tictacContainer.find(".part");
		self.partRight = self.tictacContainer.find(".part.r");
		self.partLeft = self.tictacContainer.find(".part.l");
		self.quarter = self.tictacContainer.find(".q");
		if(self.quarter.length == 0){
			self.tictacContainer.find('.slice').prepend('<div class="q"></div>');
			self.quarter = self.tictacContainer.find(".q");
		}
		clearInterval(self.interval);
		self.start(s);
	}
	this.initSilent = function(e, s) {
		self.tictacContainer = $("#" + e);
		self.tictacContainer.find('.n').html(tictacReste);
		self.slice = self.tictacContainer.find(".slice");
		self.slice.removeClass('nc').removeClass('moitie').addClass('reset');
		self.secondes = 0;
		self.compte = 0;
		self.degrees = 0;
		clearInterval(self.interval);
	}
	this.start = function(s) {
		self.secondes = s;
		/* revoir ce truc merdique*/
		self.slice.removeClass('nc').removeClass('moitie').addClass('reset');

		self.part.css({"transform":"none"});

		self.interval = window.setInterval(function () {
			self.slice.removeClass('reset');
			
			self.nombre.html(self.secondes - self.compte);
			self.compte++;
			temps = self.compte;
			if (self.compte > (self.secondes)) {
				clearInterval(self.interval);
				self.nombre.html(0);
				finMemoryPerdu(temps);
				return false;
			}
			self.degrees = self.degrees + (360 / self.secondes);
			if (self.compte >= (self.secondes / 2)) {
				self.slice.addClass("nc");
				if (!self.slice.hasClass("moitie")) self.partRight.css({"transform":"rotate(180deg)"});
				self.partLeft.css({"transform":"rotate(" + self.degrees + "deg)"});
				self.slice.addClass("moitie");
				if (self.compte >= (self.secondes * 0.75)) {
					self.quarter.remove();
				}
			} else {
				self.part.css({"transform":"rotate(" + self.degrees + "deg)"});
			}
		}, 1000);
	}
}




initMemory();