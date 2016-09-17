var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000,function () {
	console.log("Server listening.")
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
/*  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });*/
	console.log('User connected');

	socket.on('message',function (mes) {
		console.log(mes);
		socket.emit('reply',"Message Received");
	})

	socket.on('disconnect',function () {
		console.log('User disconnected');
	})
});