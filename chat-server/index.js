var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendfile('../index.html');
    });

io.on('connection', function(socket) {
   socket.on('chat message', function(msg){
             console.log('message: ' + msg);
             socket.broadcast.emit('chat message', msg);
             // TODO JSON object w/ userid, sessionid & msg
      });
   });

http.listen(3004, function(){
   console.log('listening on *: 3004');
   });