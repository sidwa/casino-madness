
var site="http://localhost/";

function getBets(){
   	ajx=new XMLHttpRequest();
	if(!ajx){
		alert("Internet explorer not supported by this site!!!");
		return;
	}
	if(ajx.readyState==4 || ajx.readyState==0){
		ajx.open("GET",site+"getBets",false);
		ajx.send();
		var response;
		//response=JSON.parse(this.responseText);
		response=this.responseText;
		//do whatever you want with response`
		return response;
	}
}

function getPlayer(game_id){
	ajx=new XMLHttpRequest();
	if(!ajx){
		alert("Internet explorer not supported by this site!!!");
		return;
	}
	ajx.open("GET",site+"player?game_id="+game_id,false);
	ajx.send();
	var response;
	//response=JSON.parse(this.responseText);
	response=ajx.responseText;
	return response;
	//do whatever you want with response
}

function initGame(game_id){
			if(game_id==1){
				enterRouletteLobby();
			}else if(game_id==2){
				enterBingoLobby();
			}
			ajx=new XMLHttpRequest();
			if(!ajx){
			alert("Internet explorer not supported by this site!!!");
			return;
			}
			if(ajx.readyState==4 || ajx.readyState==0){
				ajx.open("GET",site+"player?game_id="+game_id,true);
				ajx.onreadystatechange=serverResponse;
				ajx.send();
			}
			function serverResponse(){
				var response;
				if(ajx.readyState==4 && ajx.status==200){
					//response=JSON.parse(this.responseText);
					response=this.responseText;
					//document.getElementById("out").innerHTML=response;
					//var host=location.hostname;
					if(response.search(/not logged in/i)!=-1){
						document.getElementById("out").innerHTML=response;
					}else{
						//call your function here
					}
				}
			}
}

function getPlayers(){
			ajx=new XMLHttpRequest();
			if(!ajx){
				alert("Internet explorer not supported by this site!!!");
				return;
			}
			ajx.open("GET",site+"getPlayers",false);
			ajx.send();
			var response;
			//response=JSON.parse(this.responseText);
			response=ajx.responseText;
			return response;
			//do whatever you want with response
}

function payout(){
			ajx=new XMLHttpRequest();
			if(!ajx){
				alert("Internet explorer not supported by this site!!!");
				return;
			}
			ajx.open("GET",site+"payout",false);
			ajx.send();
			var response;
			//response=JSON.parse(this.responseText);
			response=ajx.responseText;
			return response;
			//do whatever you want with response`
} 

function putBet(bets){  //in JSON format putBet(confirmBet());
	ajx=new XMLHttpRequest();
	if(!ajx){
		alert("Internet explorer not supported by this site!!!");
		return;
	}
	ajx.open("POST",site+"putBet",false);
	ajx.setRequestHeader("Content-type", "application/json");
	console.log(confirmBet());
	ajx.send(confirmBet());
	return ajx.responseText;
}

  function timer(){
			ajx=new XMLHttpRequest();
			if(!ajx){
				alert("Internet explorer not supported by this site!!!");
				return;
			}
			ajx.open("GET",site+"timer",false);
			ajx.send();
			var response;
			//response=JSON.parse(this.responseText);
			response=ajx.responseText;
			var num=parseInt(response,10);
			return num;
			//do whatever you want with response`
}

function enterRouletteLobby() {
	ajx = new XMLHttpRequest();
	if (!ajx) {
		alert("Internet explorer not supported by this site!!!");
		return;
	}
	ajx.open("GET", site + "enterRouletteLobby", false);
	ajx.send();
	var response;
	//response = JSON.parse(ajx.responseText);
	response = ajx.responseText; //[lobby_id,colour];
	return response;
}

function leaveRouletteLobby() {
	ajx = new XMLHttpRequest();
	if (!ajx) {
		alert("Internet explorer not supported by this site!!!");
		return;
	}
	ajx.open("GET", site + "leaveRouletteLobby", false);
	ajx.send();
	var response;
	response = ajx.responseText;
}


// end roullete functions

//bingo functions
function getBingoNumber(){
	ajx=new XMLHttpRequest();
			if(!ajx){
				alert("Internet explorer not supported by this site!!!");
				return;
			}
			ajx.open("GET",site+"getBingoNumber",false);
			ajx.send();
			var response;
			//response=JSON.parse(this.responseText);
			response=ajx.responseText;
			response=response.split(",");
			for(var i=0;i<response.length;i++){
				response[i]=parseInt(response[i],10);
			}
			return response;
			//do whatever you want with response`
}

function bingoReady(){
	ajx=new XMLHttpRequest();
	if(!ajx){
		alert("Internet explorer not supported by this site!!!");
	return;
	}
	ajx.open("GET",site+"getBingoNumber",false);
	ajx.send();
	var response;
	//response=JSON.parse(this.responseText);
	response=ajx.responseText;
	response=response.split(",");
	for(var i=0;i<response.length;i++){
		response[i]=parseInt(response[i],10);
	}
	return response;
			//do whatever you want with response`
}


function updatePlayer(){
			ajx=new XMLHttpRequest();
			if(!ajx){
				alert("Internet explorer not supported by this site!!!");
				return;
			}
			ajx.open("GET","http://localhost:800/updatePlayer?won="+won+"&coins="+coins+"&coins_won="+coins_won,false);
			ajx.send();
			var response;
			//response=JSON.parse(this.responseText);
			//response=ajx.responseText;
			//document.getElementById("out").innerHTML=response;
}

function enterBingoLobby(lobby_id) {
	ajx = new XMLHttpRequest();
	if (!ajx) {
		alert("Internet explorer not supported by this site!!!");
		return;
	}
	ajx.open("GET", site + "enterBingoLobby?lobby_id=" + lobby_id, false);
	ajx.send();
	var response;
	response = ajx.responseText;
}

function leaveBingoLobby() {
	ajx = new XMLHttpRequest();
	if (!ajx) {
		alert("Internet explorer not supported by this site!!!");
		return;
	}
	ajx.open("GET", site + "leaveBingoLobby", false);
	ajx.send();
	var response;
	response = ajx.responseText;
}

// status="start" when lobby start, status="win" when player wins 
// order of status will be start, win, win, win, start, win,...
function updateBingo(lobby_id, status) {
	ajx = new XMLHttpRequest();
	if (!ajx) {
		alert("Internet explorer not supported by this site!!!");
		return;
	}
	ajx.open("GET", site +  "updateBingo?lobby_id=" + lobby_id + "&status=" + status, false);
	ajx.send();
	var response;
	response = ajx.responseText;
}