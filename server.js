var express = require('express');
var server = express();


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
