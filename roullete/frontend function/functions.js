
function getBets(){
   	ajx=new XMLHttpRequest();
	if(!ajx){
		alert("Internet explorer not supported by this site!!!");
		return;
	}
	if(ajx.readyState==4 || ajx.readyState==0){
		ajx.open("GET","localhost:800/getBets",true);
		ajx.send();
		var response;
		//response=JSON.parse(this.responseText);
		response=this.responseText;
		//do whatever you want with response`
		return response;
	}
}

function getPlayers(){
			ajx=new XMLHttpRequest();
			if(!ajx){
				alert("Internet explorer not supported by this site!!!");
				return;
			}
			ajx.open("GET","localhost:800/getPlayers",true);
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
			ajx.open("GET","localhost:800/payout",false);
			ajx.send();
			var response;
			//response=JSON.parse(this.responseText);
			response=ajx.responseText;
			return response;
			//do whatever you want with response`
} 

  function timer(){
			ajx=new XMLHttpRequest();
			if(!ajx){
				alert("Internet explorer not supported by this site!!!");
				return;
			}
			ajx.open("GET","http://localhost:800/timer",false);
			ajx.send();
			var response;
			//response=JSON.parse(this.responseText);
			response=ajx.responseText;
			var num=parseInt(response,10);
			return num;
			//do whatever you want with response`
}