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
rooms[0] = 0;
io.sockets.on('connection', (socket) => {

    // Parcrour des room pour attributionz
    for (let i = 0; i < rooms.length; i++) {
        const connectedUser = rooms[i];
        if (connectedUser < 2) {
            socket.roomid = i;
            socket.join(i);
            socket.in(socket.roomid).emit('newPlayer', 'Nouveau joueur');
            rooms[i] = connectedUser + 1;
        }
    }

    // Cette fonction permet au joueur de se renomer et prevenir les joueurs adverses;
    socket.on('rename', (pseudo) => {
        socket.pseudo = pseudo;
        socket.in(socket.roomid).emit('rename', pseudo)
    });


})