let limit = 5;
    let myNav = [];
let $bato_restant=$('#nb_bato_restant');
$bato_restant.text(limit);


let socket = io.connect('http://localhost:8888');
let songNewMsg = new Audio('song/Bomb-SoundBible.mp3');;


    // Positionnement navire et validation
    $('#me td').on('click', function () {
        if (myNav.includes(this.id)) {
            myNav = myNav.filter(n => n != this.id);
            $(this).toggleClass('nav');
        } else {
            myNav.push(this.id);
            $(this).toggleClass('nav');
        }
        $bato_restant.text(limit-myNav.length)

        if (myNav.length==limit){
            console.log(myNav.length)
            $('#validation_position').prop("disabled", false);
        }
        else {
            $('#validation_position').prop("disabled", true); 
        }
    })

    // Validation de la position des bateaux
    $('#validation_position').on('click', function () {
        console.log("validation des positions");
        socket.on('validation_position', function(data) {
            insereMessage(data.pseudo, data.message)
        })
    })

    socket.on('connectionEstablished', (message) => {
        setPseudo();
    })


     // On demande le pseudo, on l'envoie au serveur et on l'affiche dans le titre
     var pseudo = prompt('Quel est votre pseudo ?');
     socket.emit('rename', pseudo);
     document.title = pseudo + ' - ' + document.title;

     // Quand on reçoit un message, on l'insère dans la page
     socket.on('message', function(data) {
         insereMessage(data.pseudo, data.message)
     })

     // Quand un nouveau client se connecte, on affiche l'information
     socket.on('rename', function(pseudo) {
         $('#zone_chat').prepend('<p><em>' + pseudo + ' a rejoint le Chat !</em></p>');
     })

     // Lorsqu'on envoie le formulaire, on transmet le message et on l'affiche sur la page
     $('#formulaire_chat').submit(function () {
         var message = $('#message').val();
         socket.emit('message', message); // Transmet le message aux autres
         insereMessage(pseudo, message); // Affiche le message aussi sur notre page
         $('#message').val('').focus(); // Vide la zone de Chat et remet le focus dessus
         return false; // Permet de bloquer l'envoi "classique" du formulaire
     });
     
     // Ajoute un message dans la page
     function insereMessage(pseudo, message) {
         console.log("entrée dans insert message");
         $('#zone_chat').prepend('<p><strong>' + pseudo + '</strong> ' + message + '</p>');
     }
