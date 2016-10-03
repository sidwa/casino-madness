var express = require("express");
var fs = require("fs");
var bodyParser = require("body-parser");
var app = express();
var session = require("client-sessions");
var cron = require("node-cron");
var db = require("./db");
//var reqs=require("./reqs");
//app config

//db.updateBingo(1, "win");

//db.updatePlayer(30,0,100,0,function(){});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/json" }));


app.use(session({                //
	cookieName: "cas",
	secret: "hackMatKarLavde!!",
	duration: 30 * 60 * 1000, //30 min session duration
	activeDuration: 5 * 60 * 1000 //5 min active session
}));
app.use("/ses", function (req, res, next) {   //check if session started
	if (!req.cas.username) {
		res.redirect("/form.html");
		next();
	} else {
		next();
	}
});
function validateSession(req, res, func, funcfalse) {
	if (req.cas && req.cas.username) {
		func();
	} else {
		funcfalse("not LOGGED IN!!");
	}
}


app.use("/", express.static(__dirname + "/public/game"));

var cronTask = [];

function setLobbyCronJob(lobby_id, sec) {   // call this function when making a new lobby setLobbyCronJob(newLobby,10); 
	if (lobby_id > 10) {
		cronTask[lobby_id] = cron.schedule("*/" + sec +" * * * * *", function () {
			db.setTimer(lobby_id);
		}, false);
	}
	else if(lobby_id <11 && lobby_id>0){
		cronTask[lobby_id] = cron.schedule("*/"+ sec +" * * * * *", function () {
			db.setBingoNumber(lobby_id);
		},false);
	}
}

setLobbyCronJob(1, 5);
setLobbyCronJob(2, 5);
setLobbyCronJob(3, 5);
setLobbyCronJob(4, 5);
setLobbyCronJob(5, 5);
setLobbyCronJob(2, 5);
setLobbyCronJob(7, 5);
setLobbyCronJob(8, 5);
setLobbyCronJob(9, 5);
setLobbyCronJob(10, 5);
setLobbyCronJob(11, 15);


function startLobbyCronJob(lobby_id) {    // call this function when first player enters in roullete lobby 
	cronTask[lobby_id].start();			 // or 3rd players enters in bingo lobby
}

function stopLobbyCronJob(lobby_id) {     //call this function when either bingo or roullete lobby becomes empty
	cronTask[lobby_id].stop();
}
//end app config




//change app config

app.post("/setTimeOutLobby", function (req, res) {
	if (req.body.username == "godmode" && req.body.password == "doNotMessWithMe") {
		var lobby = req.body.lobby;
		var time = req.body.time;
		setLobbyCronJob(lobby, time);
	}
});





//end change app config

app.post("/register", function (req, res) {
	var username = req.body.username;
	var passwd = req.body.password;
	//console.log(req.body);
	db.register(username, passwd, function (dat) {
		res.redirect(dat);
	});
});


app.post("/unTaken", function (req, res) {
	var username = req.body.username;
	var passwd = req.body.password;
	//console.log(req.body);
	db.isUnTaken(username, function (dat) {
		res.send(dat);
	});
});


app.post("/login", function (req, res) {
	var username = req.body.username;
	var passwd = req.body.password;
	//console.log(req.body);
	db.selectPlayer(username, passwd, function (dat) {
		if (dat.length > 0) {
			req.cas.username = username;
			res.send("/ses/home.html");
			console.log(username + " logged in");
			res.end();
		} else {
			res.send("login failed!  " + username);
			console.log(dat);
		}
	})
});

app.post("/logout", function (req, res) {
	var username = req.body.username;
	validateSession(req, res, function () {
		console.log(req.cas.username + " logged out");
		db.removePlayerFromLobbies(req.cas.username, function (res) {
			for (var i = 0; i < res.length; i++) {
				//cronTask[res[i].lobby_id].stop();
			}
		});
		req.cas.reset();
		res.send("/");
	});
});

app.get("/player", function (req, res) {
	validateSession(req, res, function () {
		res.send(req.cas.username);
	},
		function (str) {
			res.send(str);
		});
});


app.get("/timer", function (req, res) { //FOR ROULLETE
	validateSession(req, res, function () {
		db.getPlayerLobby(req.cas.username, function (result) {
			var i = 0;
			while (i < result.length) {
				if (result[i].lobby_id < 11) i++;
				else break;
			}
			if (i < result.length) {
				db.timerSet(result[i].lobby_id, function (result1) {
					res.send(result1);
				});
			} else {
				res.send("timer not set");
			}
		});
	},
		function (str) {
			res.send(str);
		});
});

app.post("/putBet", function (req, res) {
	validateSession(req, res, function () {
		db.putBets(JSON.stringify(req.body));
	},
		function (str) {
			res.send(str);
		});
});

app.get("/getBets", function (req, res) { //get all bets of players ROULLETE
	validateSession(req, res, function () {
		console.log("getBets request");
		db.getPlayerLobby(req.cas.username, function (result1) {
			if (result1.length > 0) {
				var i = 0;
				console.log("result:" + result1[0].lobby_id);
				while (i < result1.length) {
					if (result1[i].lobby_id < 11) {
						console.log(i); i++;
					}
				}   //check if result lobby is for roullete
				if (i < result1.length) {
					console.log("insdwa" + result1[i].lobby_id);
					db.getBets(result1[i].lobby_id, function (result2) {
						res.send(JSON.stringify(result2));
						res.end();
					});
				} else {
					res.send("[]")
				}
			} else {
				res.send("[]");
			}
		});
	},
		function (str) {
			res.send(str);
		});
});

app.get("/getPlayers", function (req, res) { //get details of players in a lobby ROULLETE
	validateSession(req, res, function () {
		db.getPlayerLobby(req.cas.username, function (result1) {
			if (result1.length > 0) {
				console.log(result1);
				var i = 0;
				while (i < res.length) {
					if (result1[i].lobby_id < 11) i++;
					else break;
				}
				if (i < result1.length) {
					db.selectPlayersLobby(result1[i].lobby_id, function (result2) {
						console.log(result2);
						res.send(JSON.stringify(result2));
					});
				}
			}
		});
	},
		function (str) {
			res.send(str);
		});
});

app.get("/payout", function (req, res) { //get details of players in a lobby ROULLETE
	validateSession(req, res, function () {
		db.getPlayerLobby(req.cas.username, function (result1) {
			if (result1.length > 0) {
				console.log(result1);
				var i = 0;
				while (i < res.length) {
					if (result1[i].lobby_id < 11) i++;
					else return;
				}
				db.calPayout(req.cas.username, result1[i].lobby_id, function (result2) {
					console.log("result:" + result2);
					if (result2 == true) {
						res.send("you won a bet");
					} else {
						res.send("you lost all bets");
					}
					res.end();
				});
			}
		});
	}, function (str) {
		res.send(str);
	});
});





app.get("/bingoLobbyDetails",function(req,res){
	validateSession(req,res,function(){
		db.bingoLobbyDetails(req.param("lobby_id"),function(ret){
			res.send(JSON.stringify(ret));
		});
	},function (str) {
		res.send(str);
	});
});

app.get("/getNum", function (req, res) {
	validateSession(req, res, function () {
		db.getBingoNumber(function (num) {
			res.send(num);
		});
	},function (str) {
		res.send(str);
	});
});



app.get("/getBingoNumber",function(req,res){
	validateSession(req,res,function(){
		//console.log("gotcha");
		db.getBingoNumber(req.cas.username,function(ret){
			res.send(ret);
		});
	}, function (str) {
		res.send(str);
	});
});

app.get("/bingoReady", function (req, res) {
	validateSession(req, res, function () {
		console.log("gotcha");
		db.bingoReady(req.cas.username);
		res.send(req.cas.username + " ready");
		db.bingoStart(req.cas, username, function (ret) {
			if (ret.status == "ready") {
				cronTask[ret.lobby_id].start();
			}
		});
	}, function (str) {
		res.send(str);
	});
});

app.get("/setRand", function (req, res) {  // DELETE THIS LATER
	validateSession(req, res, function () {
		db.setRand(req.cas.username, req.param("num"));
		res.send("rn set");
	},
		function (str) {
			res.send(str);
		});
});








app.get("/enterRouletteLobby", function (req, res) {
	validateSession(req, res, function () {
		var username = req.cas.username;
		db.enterRouletteLobby(username, function (lobby_id, colour) {
			console.log("User " + username + " entered Roulette lobby " + lobby_id + " colour " + colour);
			res.send("User " + username + " entered Roulette lobby " + lobby_id + " colour " + colour);
		}, function (lobby_id) {
			console.log("Made new Roulette lobby");		//Crontask
			setLobbyCronJob(lobby_id, 15);
		}, function (lobby_id) {
			console.log("First member in roullete lobby");
			startLobbyCronJob(lobby_id);			//cronTask
		}
		);
	},
		function (str) {
			res.send(str)
		});
});

app.get("/leaveRouletteLobby", function (req, res) {
	validateSession(req, res, function () {
		var username = req.cas.username;
		db.leaveRouletteLobby(username, function (dat) {
			if (dat) {
				console.log("User " + username + " left Roulette lobby " + dat);
				res.send("User " + username + " left Roulette lobby " + dat);
			}
			else {
				console.log("User " + username + " not present in Roulette lobby");
				res.send("User " + username + " not present in Roulette lobby");
			}
		},
			function (lobby_id) {
				console.log("Last Member leaves Roulette lobby");
				stopLobbyCronJob(lobby_id);		//cronTask
			});
	},
		function (str) {
			res.send(str)
		});
});


app.get("/enterBingoLobby", function (req, res) {
	validateSession(req, res, function () {
		var username = req.cas.username;
		var lobby_id = req.param("lobby_id");
		db.enterBingoLobby(username, lobby_id, function (dat) {
			console.log("User " + username + " entered Bingo lobby " + dat);
			res.send("User " + username + " entered Bingo lobby " + dat);
		});
	},
		function (str) {
			res.send(str)
		});
});

app.get("/leaveBingoLobby", function (req, res) {
	validateSession(req, res, function () {
		var username = req.cas.username;
		db.leaveBingoLobby(username, function (dat) {
			if (dat) {
				console.log("User " + username + " left Bingo lobby " + dat);
				res.send("User " + username + " left Bingo lobby " + dat);
			}
			else {
				console.log("User " + username + " not present in Bingo lobby");
				res.send("User " + username + " not present in Bingo lobby");
			}
		});
	},
		function (str) {
			res.send(str)
		});
});

app.get("/updatePlayer", function (req, res) {
	validateSession(req, res, function () {
		var username = req.cas.username;
		var win = req.param("win");		//1 if win, 0 if lose
		var coins = req.param("coins");
		var coins_won = req.param("coins_won");// 0 if lose
		db.updatePlayer(username, win, coins, coins_won, function () {
			console.log("User " + username + " coins updated");
			res.send("User " + username + " coins updated");
		});
	},
		function (str) {
			res.send(str)
		});
});


// status="start" when lobby start status="win" when player wins 
        // order of status will be start, win, win, win, start, win,...
app.get("/updateBingo", function (req, res) {
	validateSession(req, res, function () {
		var username = req.cas.username;
		var lobby_id = req.param("lobby_id");
		var status = req.param("status");
		db.updateBingo(lobby_id, status, function (dat) {
			console.log(dat);
			res.send(dat);
		});
	},
		function (str) {
			res.send(str)
		});
});


app.listen(800, function () {
	console.log("CASINO STARTED");

});

