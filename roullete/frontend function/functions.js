
function getBets(){
   	ajx=new XMLHttpRequest();
	if(!ajx){
		alert("Internet explorer not supported by this site!!!");
		return;
	}
	if(ajx.readyState==4 || ajx.readyState==0){
		ajx.open("GET","localhost:800/getBets",true);
		ajx.onreadystatechange=function(){
            var response;
            if(ajx.readyState==4 && ajx.status==200){
                //response=JSON.parse(this.responseText);
                response=this.responseText;
                //do whatever you want with response`
            }
        };
		ajx.send();
	}
}

function getPlayers(){
            ajx=new XMLHttpRequest();
            if(!ajx){
                alert("Internet explorer not supported by this site!!!");
                return;
            }
            if(ajx.readyState==4 || ajx.readyState==0){
                ajx.open("GET","localhost:800/getPlayers",true);
                ajx.onreadystatechange=function(){
                    var response;
                    if(ajx.readyState==4 && ajx.status==200){
                        //response=JSON.parse(this.responseText);
                        response=this.responseText;
                        if(!response) response="[]";
                        console.log(response);
                        document.getElementById("out").innerHTML=response;
                        //do whatever you want with response`
                    }
                };
                ajx.send();
            }
}

function payout(){
            ajx=new XMLHttpRequest();
            if(!ajx){
                alert("Internet explorer not supported by this site!!!");
                return;
            }
            if(ajx.readyState==4 || ajx.readyState==0){
                ajx.open("GET","localhost:800/payout",true);
                ajx.onreadystatechange=function(){
                    var response;
                    if(ajx.readyState==4 && ajx.status==200){
                        //response=JSON.parse(this.responseText);
                        response=this.responseText;
                        if(!response) response="[]";
                        console.log(response);
                        document.getElementById("out").innerHTML=response;
                        //do whatever you want with response`
                    }
                };
                ajx.send();
            }
} 

  function timer(){
            ajx=new XMLHttpRequest();
            if(!ajx){
                alert("Internet explorer not supported by this site!!!");
                return;
            }
            if(ajx.readyState==4 || ajx.readyState==0){
                ajx.open("GET","localhost:800/timer",true);
                ajx.onreadystatechange=function(){
                    var response;
                    if(ajx.readyState==4 && ajx.status==200){
                        //response=JSON.parse(this.responseText);
                        response=this.responseText;
                        if(!response) response="[]";
                        console.log(response);
                        document.getElementById("out").innerHTML=response;
                        var num=parseInt(response,10);
                        var year=Math.floor(num/(60*60*24*365));
                        document.getElementById("out").innerHTML+="<br>years:"+year+"<br>"+Date.now();
                        //do whatever you want with response`
                    }
                };
                ajx.send();
            }
        }