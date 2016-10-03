
var roullete=[];
function Raand(game,prev,func){
    if(game=="roullete"){
        var its=10;
        var op=[];
        min=0;
        max=38;
        min=Math.floor(min);
        max=Math.ceil(max);
        for(var i=0;i<its;i++){
            op.push(Math.floor(Math.random()*(max-min)+min))
        }

        var inter=op[Math.floor(Math.random()*op.length)];
        console.log(inter);
        console.log(op);
        var res;
        if(inter>=0 && inter<36) res=inter.toString();
        else if(inter==36) res="0";
        else if(inter==37) res="00" 

        func(res);
    }
    else if(game=="bingo",prev){
        max=51;
        min=1
        if(prev.length<50){
            var op;
            do{
                op=Math.floor(Math.random()*(max-min)+min);
            }while(prev.indexOf(op)!=-1);
            func(op);
        }
    }
}

module.exports.Raand=Raand;
