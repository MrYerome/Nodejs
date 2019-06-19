const app = require('express')();
const server = require('http').createServer(app);
   const io = require('socket.io').listen(server);
 const   ent = require('ent'); // Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)

app.get('/', function (request, response) {
  response.sendfile(__dirname + '/index.html');
})
.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send("PAge introuvable");
});

io.sockets.on('connection', function (socket, pseudo) {
    socket.on('nouveau_client', function(pseudo) {
        pseudo = ent.encode(pseudo);
        socket.pseudo = pseudo;
        socket.broadcast.emit('nouveau_client', pseudo);
    });

    socket.on('message', function (message) {
        message = ent.encode(message);
        socket.broadcast.emit('message', {pseudo: socket.pseudo, message: message});
    }); 
});



server.listen(4100);  