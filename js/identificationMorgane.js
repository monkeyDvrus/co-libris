$(document).ready(function(){

	formConnection();

});


// ***************************************************
// ******************** CONNEXION ********************
// ***************************************************

// ********** GÉNÈRE FORMULAIRE CONNEXION **********
function formConnection() {

	// *** Reset div#formIdent
	$('#formIdentification').empty();

	var $h1 = $('<h1>').html('Connectez-vous:');

	$h1.appendTo('#formIdentification');

	// ********** DIV INPUT **********
	var $divInput = $('<div>').attr('id', 'divInputIdentification');
	// *** Mail
	var $inputMailConnexion = $('<input>').addClass('policeForm inputIdentification mailForm')
										  .attr({
											'name' : 'emailConnexion',
											'type' : 'email',
											'placeholder' : 'Courriel',
											'required' : 'required'
										  });
	// *** Mot de Passe
	var $inputMdpConnexion = $('<input>').addClass('policeForm inputIdentification mdpForm')
										  .attr({
											'name' : 'passwordConnexion',
											'type' : 'password',
											'placeholder' : 'Mot de passe',
											'required' : 'required'
										  });
	// *** Ajout contenu dans #divInputIdent
	$inputMailConnexion.appendTo($divInput);
	$inputMdpConnexion.appendTo($divInput);
	$divInput.appendTo('#formIdentification');
	// *******************************

	// ********** DIV BOUTON **********
	var $divBouton = $('<div>').attr('id', 'divBoutonIdentification');
	// *** Bouton Inscription
	var $buttonInscription = $('<button>').addClass('btn-modifier colorWhite')
										  .attr({
										  	'type' : 'submit',
										  	'name' : 'inscription',
										  	'value' : 'Inscription',
										  	'onclick' : 'formInscription()'
										  })
										  .html('Inscription');
	// *** Bouton Se connecter
	var $buttonConnexion = $('<button>').addClass('btn-modifier')
										  .attr({
										  	'type' : 'submit',
										  	'name' : 'seConnecter',
										  	'value' : 'Connexion',
										  	'onclick' : 'connection(event)'
										  })
										  .html('Se connecter');
	// *** Ajout contenu dans #divButtonIdent
	$buttonInscription.appendTo($divBouton);
	$buttonConnexion.appendTo($divBouton);
	$divBouton.appendTo('#formIdentification');
	// ********************************

	// ********** DIV MOT DE PASSE OUBLIÉ **********
	var $divMdpForget = $('<div>').attr('id', 'lienMdpOublie');
	var $lienMdpForget = $('<a>').attr('onclick', 'mdpForget()')
								 .html('Mot de passe oublié');
	// *** Ajout contenu dans #divMdtForget
	$lienMdpForget.appendTo($divMdpForget);
	$divMdpForget.appendTo('#formIdentification');
	// *********************************************
};
// *************************************************

// ********** FONCTION CONNEXION() AU CLIC DU BTN SE CONNECTER **********
function connection(event){
		event.preventDefault();
		// *** Récupère l'input avec la classe .mailForm et l'ajoute au stockage local avec 'mail' en clé
		localStorage.setItem('mail', $('input.mailForm').val());
		// *** Vérifie présence du mail dans BDD, si oui redirection erreur, si non message erreur
		if (verifBddMailUser()){
			console.log('mail present dans BDD');
			// *** Récupère l'input avec la classe .mdpForm et l'ajoute au stockage local avec 'mdp' en clé
			localStorage.setItem('mdp', $('input.mdpForm').val());
			// *** Lance la vérification du mdp
			if (verifMdpUser()){
				console.log('mdp ok!');
			} else {
				console.log('mdp erreur');
			};	
		} else {
			console.log('error cmpt non-existant');
		};
};

// **********************************************************************

// ***************************************************
// ******************* INSCRIPTION *******************
// ***************************************************

// ********** GÉNÈRE FORMULAIRE INSCRIPTION **********
function formInscription() {

	// *** Reset div#formIdent
	$('#formIdentification').empty();

	var $h1 = $('<h1>').html('Inscrivez-vous:');

	$h1.appendTo('#formIdentification');

	// ***** DIV INPUT *****
	var $divInput = $('<div>').attr('id', 'divInputIdentification');
	// *** Nom
	var $inputNomInscription = $('<input>').addClass('policeForm inputIdentification')
										  .attr({
											'name' : 'createNomInscription',
											'type' : 'txt',
											'placeholder' : 'Nom',
											'required' : 'required'
										  });
	// *** Prenom
	var $inputPrenomInscription = $('<input>').addClass('policeForm inputIdentification')
										  .attr({
											'name' : 'createPrenomInscription',
											'type' : 'txt',
											'placeholder' : 'Prenom',
											'required' : 'required'
										  });
	// *** Sélection déroulante Collèges
	var $selectListCollegeInscription = $('<select>');
	var $college = getListColleges();
	for (var i = 0; i < $college.length; i++) {
		var $optionList = $('<option/>').html(getNomCollege(i) + ', ' + getVilleCollege(i));
		$optionList.appendTo($selectListCollegeInscription);
	};
	// *** Mail
	var $inputMailInscription = $('<input>').addClass('policeForm inputIdentification mailForm')
										  .attr({
										  	'id' : 'mail',
											'name' : 'createEmailInscription',
											'type' : 'email',
											'placeholder' : 'Courriel',
											'required' : 'required',
											'onclick' : 'verifConfirmInput($(\'#mail\'), $(\'#confirmMail\'), $(\'#mail\'))'
										  });
	// *** Mail confirmation
	var $inputConfirmMailInscription = $('<input>').addClass('policeForm inputIdentification')
										  .attr({
										  	'id' : 'confirmMail',
											'name' : 'confirmEmailInscription',
											'type' : 'email',
											'placeholder' : 'Confirmer le courriel',
											'required' : 'required',
											'onclick' : 'verifConfirmInput($(\'#mail\'), $(\'#confirmMail\'), $(\'#confirmMail\'))'
										  });
	// *** Mot de passe
	var $inputMdpInscription = $('<input>').addClass('policeForm inputIdentification')
										  .attr({
										  	'id' : 'mdp',
											'name' : 'createPasswordInscription',
											'type' : 'password',
											'placeholder' : 'Mot de passe',
											'required' : 'required',
											'onclick' : 'verifConfirmInput($(\'#mdp\'), $(\'#confirmMdp\'), $(\'#mdp\'))'
										  });
	// *** Mot de passe confirmation
	var $inputConfirmMdpInscription = $('<input>').addClass('policeForm inputIdentification')
										  .attr({
										  	'id' : 'confirmMdp',
											'name' : 'confirmPasswordInscription',
											'type' : 'password',
											'placeholder' : 'Confirmer le mot de passe',
											'required' : 'required',
											'onclick' : 'verifConfirmInput($(\'#mdp\'), $(\'#confirmMdp\'), $(\'#confirmMdp\'))'
										  });
	// *** Ajout contenu dans #divInputIdent
	var $contenu = $([$inputNomInscription, $inputPrenomInscription, $selectListCollegeInscription, $inputMailInscription, $inputConfirmMailInscription, $inputMdpInscription, $inputConfirmMdpInscription]);
	$contenu.each(function(i, elem){
		$(this).appendTo($divInput);
	});
	$divInput.appendTo('#formIdentification');
	// *********************

	// ********** DIV BOUTON **********
	var $divBouton = $('<div>').attr('id', 'divBoutonIdentification');
	// *** Bouton S'inscrire
	var $buttonInscription = $('<button>').addClass('btn-modifier colorWhite')
										  .attr({
										  	'type' : 'submit',
										  	'name' : 'sIncrire',
										  	'value' : 'Inscription',
										  	'onclick' : 'inscription(event)'
										  })
										  .html('S\'inscrire');
	// *** Bouton Connexion
	var $buttonConnexion = $('<button>').addClass('btn-modifier')
										  .attr({
										  	'type' : 'submit',
										  	'name' : 'connexion',
										  	'value' : 'Connexion',
										  	'onclick' : 'formConnection()'
										  })
										  .html('Connexion');
	// *** Ajout contenu dans #divBoutonIdent
	$buttonInscription.appendTo($divBouton);
	$buttonConnexion.appendTo($divBouton);
	$divBouton.appendTo('#formIdentification');
	// ********************************

};
// ***************************************************

// ********** FONCTION INSCRIPTION() AU CLIC DU BTN S'INSCRIRE **********
function inscription(event){
	event.preventDefault();
	if ($('#confirmMail').conf == true){
		// *** Récupère l'input avec le type email et la classe .mailForm
		var $input = $('input.mailForm');
		// *** Vérifie présence du mail dans BDD, si oui redirection erreur, si non ajout du compte dans BDD
		if (verifBddMailUser($input.val())){
			// errorCmptExistantMsg();
			console.log('error cmpt existant');
		} else {
			// *** Création du tableau contenant les valeurs des inputs qui seront passé en paramètre
			var $dataValue = [];
			// *** Récupère les inputs + le select
			var $dataInputs = $('input[name^="create"]');
			$dataInputs.push($('select'));

			// *** Ajoute les valeurs des inputs dans $dataValue
			$dataInputs.each(function(){
				$dataValue.push($(this).val());	
			});
			// *** Ajout de l'état de validation
			$dataValue.push('false', '3');
			// *** Appel ajoutCmptUser avec la liste des inputs commançant par create + le select
			ajoutCmptUser($dataValue);
		};
	} else {
		console.log('champs erreur');
	};
};
// **********************************************************************

// ********** LANCE L'AJOUT DE COMPTE DANS LA BDD **********
function ajoutCmptUser(dataInputs){
	// *** Création de l'objet dataCmpt qui sera push dans la BDD
	var $dataCmpt = {};
	// *** Récupère les données en paramètre
	var $dataValue = dataInputs;

	// *** Ajoute la valeur des inputs dans l'objet dataCmpt
	$dataCmpt.nom = $dataValue[0];
	$dataCmpt.prenom = $dataValue[1];
	$dataCmpt.college = $dataValue[4];
	$dataCmpt.courriel = $dataValue[2];
	$dataCmpt.mdp = $dataValue[3];
	$dataCmpt.validate = $dataValue[5];
	$dataCmpt.droit = $dataValue[6];

	// *** Appel pushBddNewCmptUser() pour ajouter le paramètre dans la BDD Utilisateur
	pushBddNewCmptUser($dataCmpt);
};
// *********************************************************

// ***************************************************
// ********************* OUTILS **********************
// ***************************************************

// ********** OUTILS VÉRIFS **********
// *** Vérifie que la valeur de deux inputs soient identique + retour booléen
function verifConfirmInput(data, confirmData, event){
	var $dataInput = data;
	var $confirmDataInput = confirmData;
	var $eventInput = event;

	$eventInput.keyup(function(){
		var $test = $dataInput.val();
		var $mtest = $confirmDataInput.val();
 	 	if ($test === $mtest){
 	 		console.log('ok');
 	 		$confirmDataInput.removeClass('errorInputConfirm').attr('conf', true);
 	 	} else {
 	 		console.log('erreur');
 	 		$confirmDataInput.addClass('errorInputConfirm').attr('conf', false);
 	 	};
	});
};
// ***********************************

// ********** OUTILS LISTE DES COLLÈGES **********
function getListColleges(){
	return tabBaseCollege;
};

function getNomCollege(index){
	return tabBaseCollege[index].nom;
};

function getVilleCollege(index){
	return tabBaseCollege[index].ville;
};
// ***********************************************

// ********** OUTILS LISTE DES UTILISATEURS **********
function getListUsers(){
	return tabBaseUtilisateur;
};

// *** Vérifie que le mail enregistré dans le localStorage est présent dans la BDD utilisateurs + retour booléen
function verifBddMailUser(){
	var $listUser = $(getListUsers());
	for (var i = 0; i < $listUser.length; i++) {
		if (localStorage.mail === $listUser[i].courriel) {
			localStorage.setItem('id', i);
			return true;
		};
	};
	return false;
};

// *** Vérifie que le mdp enregistré dans le localStorage correspond au compte lié au mail + retour booléen
function verifMdpUser(){
	var $listUser = $(getListUsers());
	if (localStorage.mdp === $listUser[localStorage.id].mdp) {
		return true;
	};
	return false;
};

// *** Ajout nouveau compte utilisateur dans la BDD
function pushBddNewCmptUser(dataCmpt){
	tabBaseUtilisateur.push(dataCmpt);
};
// ***************************************************


// ***************************************************
// ******************* TEMPORAIRE ********************
// ***************************************************

// ***TEMPORAIRE*** A SUPPRIMER QUAND BDD COLLEGES FONCTIONNELLE
var tabBaseCollege = [
    { //1
        nom: "Simin Palay",
        ville: "lescar"
    },
    { //2
        nom: "Henri IV",
        ville: "lescar"
    },
    { //3
        nom: "Ernest Gabard",
        ville: "lescar"
    },
    { //4
        nom: "Irandatz",
        ville: "lescar"
    },
    { //5
        nom: "d'Ossau",
        ville: "lescar"
    }
];


// ***TEMPORAIRE*** A SUPPRIMER QUAND BDD UTILISATEURS FONCTIONNELLE
// {
// 		nom : ,
// 		prenom : ,
// 		college : ,
// 		courriel : ,
// 		mdp : ,
// 		validate : ,
// 		droit : 
// 	},
var tabBaseUtilisateur = [
	{
		nom : 'Durand',
		prenom : 'Josué',
		college : 'Simin Palay',
		courriel : 'josue.durand@greta-sud-aquitaine.academy',
		mdp : 'pifPafP0f',
		validate : true,
		droit : '1'
	},
	{
		nom : 'Drissi',
		prenom : 'Morgane',
		college : 'Henry IV',
		courriel : 'morgane.drissi@greta-sud-aquitaine.academy',
		mdp : '123456789*',
		validate : true,
		droit : '2'
	},
	{
		nom : 'Guy',
		prenom : 'Sébastien',
		college : 'Ernest Gabarsd',
		courriel : 'sebastien.guy@greta-sud-aquitaine.academy',
		mdp : 'pifPafP0f',
		validate : true,
		droit : '3'
	},
	{
		nom : 'Lobjois',
		prenom : 'Yann',
		college : 'Irandatz',
		courriel : 'yann.lobjois@greta-sud-aquitaine.academy',
		mdp : 'pifPafP0f',
		validate : false,
		droit : '3'
	}
];
