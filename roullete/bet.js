var act=document.getElementById("bet");
var time=0;
act.onclick=bet;

function bet(){
	var amt=document.getElementById("amt").value;
	var slot=document.getElementById("slot").value;
	act.style.display="none";
	

	var ajx=createAjxObj();
	if(!ajx){
		alert("internet explorer not supported!!!");
		return;
	}
	if(ajx.readyState==4 || ajx.readyState==0){
		ajx.open("POST","bet.php",true);
		ajx.onreadystatechange=serverResponse;
		ajx.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		ajx.send("slot="+slot+"&amt="+amt);
	}

	function serverResponse(){
		if(ajx.readyState==4 && ajx.status==200){
			document.getElementById("out").innerHTML=this.responseText;
		}
	}
}

function betPlaced(){

}

function cTimer(){

}

function createAjxObj(){
	var ajx;
	try{
		ajx=new XMLHttpRequest();
	}catch(e){
		ajx=false;
	}
	return ajx;
}
