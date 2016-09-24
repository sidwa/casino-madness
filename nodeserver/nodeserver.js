var server = require('express')();
var app = require('http').Server(server);
var io = require('socket.io')(app);

var fs = require('fs');



app.listen(3000, function () {
  console.log('Server listening on port 3000.')
});

server.get('/', function (req, res, next) {
  res.sendFile(__dirname + '/index.html');
});

server.get('/jsFunctions.js', function (req, res, next) {
  res.sendFile(__dirname + '/jsFunctions.js');
});

server.get('/j_son.js', function (req, res, next) {
  res.sendFile(__dirname + '/j_son.js');
});

//socket connection
io.on('connection', function (socket) {
  console.log('User Connected');


  socket.on('confirmBet', function (bet) { 


    fs.readFile(__dirname + '/lobby.json', function (err, data) {
      if (err) {
        return console.error(err);
      }
      else {
        console.log('Json file read');
      }

      var lobbyObj = JSON.parse(data);
      var betObj = JSON.parse(bet);
      console.log(lobbyObj);
      console.log(betObj);
 
      for (username in betObj) {
        lobbyObj[username] = betObj[username];
        console.log(lobbyObj);
      }

      fs.writeFile(__dirname + '/lobby.json', JSON.stringify(lobbyObj), function (err) {
        if (err) {
          return console.error(err);
        }
        console.log('Json file updated')
      });

  });
  });

  socket.on('disconnect', function () {
    console.log('User disconnected');
  });

});

/*
  for(var lobby in lobbyObj.lobbies){
    if(lobbyObj.lobbies[lobby].lobbyId == obj.lobbyId){
//    lobbyObj.lobbies[lobby].member = obj.member;
      console.log(lobbyObj.lobbies[lobby].member);
      console.log(obj.member);
  }
  }*/

/*io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
*/
//server.use(express.static('public'));

/*var myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};

server.use(myLogger);

server.get('/',function (req, res) {
//	res.send("Hello world");
});
*/




//console.log(lobbyObj.lobbies[0].member[0].userId);
  //    console.log(lobbyObj.username);
      //console.log(betObj);

/*      
*/
      //lobbyJson.put(bet);
      /*var lobbyObj = JSON.parse(data);
      var mempresent = 0;
      //checking whether the user data is present in the Json file
      for (var val in lobbyObj.lobby[user.lobbyId].member) {
        if (lobbyObj.lobby[user.lobbyId].member[val].userId == user.member.userId) {
          mempresent = 1;
          console.log('Member present');
          break;
        }
      }

      //if not present then user data is added to the json file
      if (!mempresent) {
        lobbyObj.lobby[user.lobbyId].member.push(user.member);
        fs.writeFile('./lobby.json', JSON.stringify(lobbyObj), function (err) {
          if (err) {
            return console.error(err);
          }
          console.log('Json file updated')
        });
      }
*/  
  /*
    socket.on('placeBet', function(betVal){
      console.log("Bet Placed "+betVal);
    });
    */

    /*var express = require('express');
var server = express();
var app = require('http').Server(server);
var io = require('socket.io')(app); 
*/
//var lobbyObj = require('./lobby.json');

/*fs.readFile('lobby.json',function (err , data) {
	if (err) throw err;
	lobbyObj = JSON.parse(data);
	console.log(lobbyObj);
})*/