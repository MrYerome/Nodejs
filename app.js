var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8888);
app.use(express.static(__dirname + '/public')).get('/', function (req, res) {

    res.setHeader('Content-Ty pe', 'text/plain');
    res.render("index.html");
});

io.on('connection', () => {
    console.log("Nouvelle connection Utilisateur");
})




let bn={
    rooms: {}
} ;
io.sockets.on('connection', (socket) => {
    let isAddToRoom = false;
let rooml = Object.keys(bn.rooms);
   console.log("nombre de rooms : " + rooml.length);

    // Parcour des room pour attributionz
    for (let i = 0; i < rooml.length; i++) {
        console.log("nombre de rooms : " + rooml.length);
        console.log("entrée dans le for");
        const room = bn.rooms[i];
let rl = Object.keys(room);
         if (rl.length < 3) {
            console.log("entrée dans le if");
        //     // on ajoute le player
        room.player2 = socket;
        console.log(room.player2);
        //     // on join la room
             socket.join(room.roomid);
        //     // on notifi
             socket.in(room.roomid).emit('newPlayer', 'Nouveau joueur');
             isAddToRoom = true
                    // console.log(rooms);
         }
    }

    // sinon on creer une room
    if (!isAddToRoom) {
        bn.rooms[rooml.length] = { "roomid": rooml.length, "player1": socket };
        socket.join(rooml.length);
        socket.in(rooml.length).emit('newPlayer', 'Nouveau joueur');
    }

    // Cette fonction permet au joueur de se renomer et prevenir les joueurs adverses;
    socket.on('rename', (pseudo) => {
        socket.pseudo = pseudo;
        socket.in(socket.roomid).emit('rename', pseudo)
    });


    socket.on('validation_position', (Coords) => {

    });

})


