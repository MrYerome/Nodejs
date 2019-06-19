var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8888);
app.use(express.static(__dirname + '/public')).get('/', function (req, res) {

    res.setHeader('Content-Type', 'text/plain');
    res.render("index.html");
});

io.on('connection', () => {
    console.log("Nouvelle connection Utilisateur");
})

