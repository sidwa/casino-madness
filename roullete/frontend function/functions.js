
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
	ajx=new XMLHttpRequest();
			if(!ajx){
			alert("Internet explorer not supported by this site!!!");
			return;
			}
			if(ajx.readyState==4 || ajx.readyState==0){
				ajx.open("GET",site+"player?game_id="+game_id,true);
				ajx.onreadystatechange=serverResponse;
				ajx.setRequestHeader("Content-type", "application/json");
				console.log(JSON.stringify(obj));
				ajx.send(JSON.stringify(obj));
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