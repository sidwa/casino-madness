



var bets = [];

function Bet(th/*1000coin*/, fi/*500coin*/, hu/*100coin*/, slots) {  //constructor for a bet
	this.th = th;
	this.fi = fi;
	this.hu = hu;
	try {
		if (typeof (slots) != "object") throw "Pass slots(even single) as an array";
	} catch (err) {
		console.log("Place the bet proper!!  " + err);
		return;
	}
	this.slots = slots;
}

function condense(bets, newBet) { // for later placement of coins at place where bet is already put by the player
	var condense = false;
	for (var i = 0; i < bets.length; i++) {
		var j;
		for (j = 0; j < bets[i].slots.length; j++) {
			if (bets[i].slots[j] !== slots[j]) { //data type sensitive slot by slot comparison
				break;
			}
		}
		if (j == bets[i].slots.length) {  //the new bet is at the same place as the previous bet
			bets[i].th += newBet.th;    //update coin quanttities
			bets[i].fi += newBet.fi;
			bets[i].hu += newBet.hu;
			return;
		}
	}
	return newBet;
}

function placeBet(newBet) {      //pushes the new bet into the list of all placed bets
	if (condense(bets, newBet) != null) {
		bets.push(newBet);
	}
}

function confirmBet(username) {  // converts js objects to JSON for transmission
	return '{"' + username + '":' + JSON.stringify(bets) + '}';
}

var socket = io();
var slots = [1, 2, 3, 4];
function socketConfirmBet() {
	placeBet(new Bet(0, 0, 3, slots));
	socket.emit('confirmBet', confirmBet("sidwa"));
}


//example usage below
/*
var slots=[1,2,3,4];
placeBet(new Bet(0,0,3,slots));
console.log(confirmBet("sidwa"));
placeBet(new Bet(0,0,3,slots));
console.log(confirmBet("sidwa"));
slots=[2,4,5,8];
placeBet(new Bet(0,0,3,slots));
console.log(confirmBet("sidwa"));
placeBet(new Bet(1,2,3,slots));
console.log(confirmBet("sidwa"));
*/
//comment it or delete it 

//var data=JSON.parse(dat)
/*var taus=JSON.parse(data.coin.th);
var fi=JSON.parse(data.coin.fi);
for(var i=0;i<taus.bets.length;i++){
	document.getElementById("1000").innerHTML+="slots"+taus.bets[i].slots+"<br>";
	document.getElementById("1000").innerHTML+="numbers"+taus.bets[i].quantity+"<br>";
}*/