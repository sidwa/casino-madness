/*JSON FORMAT  bets format                                       array of bet objects
    [                                     
		{username:"mit17k",th:0,fi:0,hu:6,slots:[1,2,3,4]},		username must with each bet objects
		{username:"mit17k",th:0,fi:0,hu:6,slots:["1stin12"]}
	]
*/
/*JSON format get player in lobby
	[
		{username:"mit17k",coins:"10000",color:"red"},
		{username:"sidwa",coins:"11000",color:"red"}
	]
*/


// required Global variables
var bets=[];
var username="mit17k";
// end required Global variables


function Bet(username,th/*1000coin*/,fi/*500coin*/,hu/*100coin*/,slots){  //constructor for a bet
	this.username=username;
	this.th=th;
	this.fi=fi;
	this.hu=hu;
	try{
		if(typeof(slots)!="object") throw "Pass slots(even single) as an array";
	}catch(err){
		console.log("Place the bet proper!!  "+ err);
		return;
	}
	this.slots=slots;
}

function condense(bets,newBet){ // for later placement of coins at place where bet is already put by the player
	var condense=false;
	for(var i=0;i<bets.length;i++){
		var j;
		for(j=0;j<bets[i].slots.length;j++){
			if(bets[i].slots[j]!==slots[j]){ //data type sensitive slot by slot comparison
				break;
			}
		}
		if(j==bets[i].slots.length){  //the new bet is at the same place as the previous bet
			bets[i].th+=newBet.th;    //update coin quanttities
			bets[i].fi+=newBet.fi;
			bets[i].hu+=newBet.hu;
			return;
		}
	}
	return newBet;
}

function placeBet(newBet){      //pushes the new bet into the list of all placed bets
	if(condense(bets,newBet)!=null){
		bets.push(newBet);
	}
}

function confirmBet(){  // converts js objects to JSON for transmission
	return JSON.stringify(bets);
}

//example usage below
var slots=[1,2,3,4];
placeBet(new Bet("mit17k",0,0,3,slots));
//console.log(confirmBet("sidwa"));
placeBet(new Bet("mit17k",0,0,3,slots));
//console.log(confirmBet("sidwa"));
slots=[2,4,5,8];
placeBet(new Bet("mit17k",0,0,3,slots));
//console.log(confirmBet("sidwa"));
placeBet(new Bet("mit17k",1,2,3,slots));
console.log(confirmBet());
//comment it or delete it 
var js=JSON.parse(confirmBet());
//var data=JSON.parse(dat)
/*var taus=JSON.parse(data.coin.th);
var fi=JSON.parse(data.coin.fi);
for(var i=0;i<taus.bets.length;i++){
	document.getElementById("1000").innerHTML+="slots"+taus.bets[i].slots+"<br>";
	document.getElementById("1000").innerHTML+="numbers"+taus.bets[i].quantity+"<br>";
}*/

/*
OUTPUT

{sidwa:[{"th":0,"fi":0,"hu":6,"slots":[1,2,3,4]},{"th":1,"fi":2,"hu":6,"slots":[2,4,5,8]}]}

*/