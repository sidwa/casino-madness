var fs = require('fs');
var express = require('express');
var server = express();
var lobObj = require('./lobby.json');

/*fs.readFile('lobby.json',function (err , data) {
	if (err) throw err;
	lobObj = JSON.parse(data);
	console.log(lobObj);
})*/

server.use(express.static('public'));

/*var myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};

server.use(myLogger);

server.get('/',function (req, res) {
//	res.send("Hello world");
});
*/

server.listen(3000,function () {
	console.log('Server listening on port 3000.')
});


console.log(lobObj.lobbies[0].member[0].userId);
