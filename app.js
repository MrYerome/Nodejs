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



let rooms = [];
rooms[0] = null;
io.sockets.on('connection', (socket) => {
    let isAddToRoom = false;
    // Parcrour des room pour attributionz
    for (let i = 0; i < bn.rooms.length; i++) {
        const room = bn.rooms[i];

        // s'il reste une place dans la room
        if (room.length < 3) {
            // on ajoute le player
            room.player2 = socket;
            // on join la room
            socket.join(room.roomid);
            // on notifi
            socket.in(room.roomid).emit('newPlayer', 'Nouveau joueur');
            isAddToRoom = true
        }
    }
    // sinon on creer une room
    if (!isAddToRoom) {
        bn.rooms[bn.room.length] = { "roomid": bn.room.length, "player1": socket };
        socket.join(room.roomid);
        socket.in(room.roomid).emit('newPlayer', 'Nouveau joueur');
    }

    // Cette fonction permet au joueur de se renomer et prevenir les joueurs adverses;
    socket.on('rename', (pseudo) => {
        socket.pseudo = pseudo;
        socket.in(socket.roomid).emit('rename', pseudo)
    });


})