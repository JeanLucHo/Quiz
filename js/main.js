/**
 * variables pour les éléments du html, les questions choisies et le score
 */
var eltH1 = document.querySelector("h1");
var buttonNext = document.querySelector('button.suivant');
var submit = document.querySelector('button.soumettre');
var giveUp = document.querySelector('button.abandonne');
var pickedQuestions = [""];
var questionOrder = [""];
var nbr = 0;
var userScore = 0;

/**
 * La fonction pour chercher et choisir les questions aléatoirement
 */

function chercherQuestions(tableauQuestions) {
    /**Si l'utilisateur à choisi novice */
    if(document.querySelector('input#novice').checked == true){
        /** Choisir les 3 questions faciles*/
        for(x=0; x < 3; x++){    
            var positionAleatoire = Math.floor(Math.random() * questions.facile.length);
            //console.log("question #" + (x+1),": ", questions. facile[positionAleatoire]);
            pickedQuestions[x] = questions.facile[positionAleatoire]
            questions.facile.splice(positionAleatoire, 1);
        }
        /** Choisir les 2 questions moyennes*/
        for(x=3; x < 5; x++){    
            var positionAleatoire = Math.floor(Math.random() * questions.intermediaire.length);
            //console.log("question #" + (x+1),": ", questions.intermediaire[positionAleatoire]);
            pickedQuestions[x] = questions.intermediaire[positionAleatoire]
            questions.intermediaire.splice(positionAleatoire, 1);
        }
        //console.log(questions);
    }
    /**Si l'utilisateur à choisi expert */
    else if(document.querySelector('input#difficileMode').checked == true){
        /** Choisir les 2 questions moyennes*/
        for(x=0; x < 2; x++){    
            var positionAleatoire = Math.floor(Math.random() * questions.intermediaire.length);
            //console.log("question #" + (x+1),": ", questions.intermediaire[positionAleatoire]);
            pickedQuestions[x] = questions.intermediaire[positionAleatoire]
            questions.intermediaire.splice(positionAleatoire, 1);
        }
        /** Choisir les 3 questions difficiles */
        for(x=2; x < 5; x++){    
            var positionAleatoire = Math.floor(Math.random() * questions.difficile.length);
            //console.log("question #" + (x+1),": ", questions.difficile[positionAleatoire]);
            pickedQuestions[x] = questions.difficile[positionAleatoire]
            questions.difficile.splice(positionAleatoire, 1);
        }
        //console.log(questions);
    };
    /**
     * Mélanger l'ordre des questions 
     */
    for(x=0; x < 5; x++){ 
        var positionAleatoire2 = Math.floor(Math.random() * pickedQuestions.length);
        console.log("question #" + (x+1),": ", pickedQuestions[positionAleatoire2]);
        questionOrder[x] = pickedQuestions[positionAleatoire2]
        pickedQuestions.splice(positionAleatoire2, 1);
    }
    x = 0;
    //console.log(questionOrder)
    //console.log(tableauQuestions);
    
}

/**
 * Programmation du bouton "Suivant" pour commencer
 */

buttonNext.addEventListener('click', function() {
    /**Vérifier qu'une difficulté à été choisie */
    if(document.querySelector('input#novice').checked == true || 
    (document.querySelector('input#difficileMode').checked == true)){
        chercherQuestions(questions);
        this.style.display = "none";
        document.querySelector("section").style.display = "none";
        eltH1.innerHTML = "Question " + 1;
        afficherQuestions();
    }
    else{
        fautChoisirDifficulté = "<p class = 'fautChoisir'>" + "Il faut choisir une difficulté." + "</p>"
        document.querySelector("ul").innerHTML = fautChoisirDifficulté;
        
    }
});

/**
 * Fonction pour afficher les questions et les changer
 */

function afficherQuestions() {
    var contenu = "";
    contenu += "<section>"
        + "<p>" + "niveau : " + questionOrder[nbr].niv + "</p>"
        + "<p class = 'question'>" + questionOrder[nbr].question + "</p>"
        + "<div onclick='selectSection(this)' id='choixSection1'>"+"<input type='radio' name = 'choix' id = 'choix1'>" 
        + "<label for = 'choix1'>"+ questionOrder[nbr].reponses[0] +"</label>"+"</div>"
        + "<div onclick='selectSection(this)' id='choixSection2'>"+"<input type='radio' name = 'choix' id = 'choix2'>" 
        + "<label for = 'choix2'>"+ questionOrder[nbr].reponses[1] +"</label>" +"</div>"
        + "<div onclick='selectSection(this)' id='choixSection3'>"+"<input type='radio' name = 'choix' id = 'choix3'>" 
        + "<label for = 'choix3'>"+ questionOrder[nbr].reponses[2] +"</label>" +"</div>"
        + "<div onclick='selectSection(this)' id='choixSection4'>"+"<input type='radio' name = 'choix' id = 'choix4'>" 
        + "<label for = 'choix4'>"+ questionOrder[nbr].reponses[3] +"</label>" +"</div>"
        + "</section>"
        + "<li>"
        + "</li>";
        /**On ajoute les boutons pour continuer et abandonner */
    document.querySelector("ul").innerHTML = contenu;
    document.querySelector(".soumettre").style.display = "block"
    document.querySelector(".abandonne").style.display = "block"
}
/**
 *  Quand on selectione le div, son boutton radio se coche
 */

function selectSection(choix) {
    switch(choix.id) {
        case "choixSection1":
            document.getElementById('choix1').checked = true;
            break;
        case "choixSection2":
            document.getElementById('choix2').checked = true;
            break;
        case "choixSection3":
            document.getElementById('choix3').checked = true;
            break;
        case "choixSection4":
            document.getElementById('choix4').checked = true;
            break;
    }
}


/**
 * Button: "Soumettre la réponse" et "Vérification des réponses"
 */


submit.addEventListener('click', function() {
    // console.log(1 + (questionOrder[nbr].bonneRep));
    // console.log(("choix" + (1 + (questionOrder[nbr].bonneRep))));
    // console.log(x);
    // console.log(document.getElementById("choix" + (1 + (questionOrder[nbr].bonneRep))).checked);

    /**Vérifier qu'une réponse a été choisie */
    if(document.querySelector("input#choix1").checked == true ||
    document.querySelector("input#choix2").checked == true ||
    document.querySelector("input#choix3").checked == true ||
    document.querySelector("input#choix4").checked == true)
    {   
        /**Si c'est la bonne réponse, alors le score augmente. */
        if(document.getElementById("choix" + (1 + (questionOrder[nbr].bonneRep))).checked == true){
            userScore++;
            console.log("Score est de :" + userScore);
            alert("Correcte!")
            document.querySelector("li").style.display = "none";
        }
        /**Si ce ne'est pas la bonne réponse, le score ne change pas.*/
        else{
            console.log("Score est de :" + userScore);
            var laBonneRep = questionOrder[nbr].bonneRep
            alert("Faux, la bonne réponse etait : " + questionOrder[nbr].reponses[laBonneRep] );
            document.querySelector("li").style.display = "none";
        }

        /**Incrématation d'un compteur*/
        nbr++;
        if (nbr < questionOrder.length){
            afficherQuestions();
            eltH1.innerHTML = "Question " + (nbr + 1);
        }
        /**Calculer le score*/
        else{
            var Grade = "Votre note : " + (userScore * 20) + "%";
            contenuFin = "<label>"
            + "Taux de réussite : "
            + userScore 
            +" / 5" 
            +"</label>"
            + "<br>"
            + "<br>"
            + "<label>"
            + Grade 
            + "</label>";
            document.querySelector("ul").innerHTML = contenuFin;
            document.querySelector(".soumettre").style.display = "none";
            document.querySelector(".abandonne").style.display = "none";
            document.querySelector(".reset").style.display = "block"
            eltH1.innerHTML = "Résultats";
        }
    }

    
    /**Vérifier qu'une réponse à été choisie */
    else{
        document.querySelector("li").style.display = "block";
        fautChoisirRep = "<p class = 'fautChoisir'>" + "Il faut choisir une réponse." + "</p>"
        document.querySelector("li").innerHTML = fautChoisirRep;
        
    }

});

/**Button Abandonné*/
giveUp.addEventListener('click', function() {
    nbr = 5;
    var Grade = "Votre note : " + (userScore * 20) + "%";
    contenuFin = "<label>"
    + "Taux de réussite : "
    + userScore 
    +" / 5" 
    +"</label>"
    + "<br>"
    + "<br>"
    + "<label>"
    + Grade 
    + "</label>"
    document.querySelector("ul").innerHTML = contenuFin;
    document.querySelector(".soumettre").style.display = "none"
    document.querySelector(".abandonne").style.display = "none"
    document.querySelector(".reset").style.display = "block"
    eltH1.innerHTML = "Résultats";

});


/**Button Reset*/
document.querySelector('button.reset').addEventListener('click', function() {

    location.reload()

});

