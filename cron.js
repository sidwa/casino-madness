var cron = require('node-cron');
var time 
console.log(Date.now()/1000 | 0); 
var task=cron.schedule('*/10 * * * * *', function(){
    console.log(Date.now()/1000 | 0);
    console.log();
},false);

task.start();