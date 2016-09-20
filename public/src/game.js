
/* global Phaser */

/* jquery node module */
//var $ = require('jquery');

/* phaser node module */
// window.PIXI = require('phaser/build/custom/pixi');
// window.p2 = require('phaser/build/custom/p2');
// window.Phaser = require('phaser/build/custom/phaser-split');

var gameid;
var playerid;
var cashbalance;

$.ajax({
    'async': false,
    'global': false,
    'url': 'src/test.json',
    'dataType': "json",
    'success': function (data) {
        playerid = data.userid;
        cashbalance = data.cashbalance;
        gameid = data.gameid;
    }
});

function goFull(){
    
}

BALL = function (game, output_number) {
    this.game = game;
    this.output_number = output_number;
};

/* Initialize Phaser */
var game = new Phaser.Game(1366, 675 , Phaser.CANVAS);

var bootState = function(game) {
    console.log("Initialize");
};

bootState.prototype = {
    preload: function(){
        this.load.image('loading', 'assets/sprites/loading.png');
    },
    create: function(){
        this.state.start('roulletPreloadGame');
    }
};

var roulletPreloadGame = function(game){
    console.log("Loading roullet game");
};

roulletPreloadGame.prototype = {
    preload: function () {
        this.loading = this.add.sprite(700, 300, 'loading');
        this.loading.anchor.setTo(0.5, 0.5);

        this.load.image('wheel_frame' , 'assets/sprites/wheelframe.png');
        this.load.image('spin_wheel' , 'assets/sprites/spinwheel.png');
        this.load.image('ball' , 'assets/sprites/ball.png');
    },
    create: function () {
        this.state.start('roulletRenderGame');
    }
};

var count = 0;
var rotate = true;
var play = true;
var drop_begin = false;
var drop = false;
var pin = false;
var decelaration = 0.007;
var speed = 2;
    
    
var roulletRenderGame = function(game) {
    console.log("Render roullet game");
};

roulletRenderGame.prototype = {
    
    create: function() {
        game.time.desiredFps = 60;
        
        console.log(window.innerHeight);
        console.log(window.innerWidth);
        
        this.wheel_frame = this.add.sprite(300, 300, 'wheel_frame');
        this.spin_wheel = this.add.sprite(300, 300, 'spin_wheel');
        this.ball = this.add.sprite(300, 300, 'ball');
        
        this.wheel_frame.scale.setTo(0.6, 0.6);
        this.wheel_frame.anchor.setTo(0.5 , 0.5);
        
        this.spin_wheel.scale.setTo(0.6, 0.6);
        this.spin_wheel.anchor.setTo(0.5 , 0.5);
        
        this.ball.scale.setTo(0.6, 0.6);
        this.ball.anchor.setTo(0.5, 10);
        
    },

    update: function() {
        if(play){
            this.spin_wheel.angle -= 2;
        }
        if(rotate){
            this.ball.angle += 2;
            if(game.math.roundTo(this.ball.angle, 0) === 0){
                count++;
                if(count === 2){
                    rotate = false;
                    drop_begin =true;
                    count = 0;
                }
            }
        }
        if(drop_begin){
            if(speed <= 0.56){
                drop_begin = false;
                drop = true;
            }
            speed -= decelaration;
            this.ball.angle += speed;
            this.ball.anchor.y -= 0.009;
        }
        if(drop){
            this.ball.anchor.y -= 0.145;
            //this.ball.angle += speed;
            if(this.ball.anchor.y < 5.2){
                drop = false;
                pin = true;
            }
        }
        if(pin){
            this.ball.angle -= 2;
            //console.log(game.math.roundTo(this.ball.angle, 0));
            if(game.math.roundTo(this.ball.angle, 0) >= 0 && game.math.roundTo(this.ball.angle, 0) <= 1){
                count++;
                if(count === 1){
                    pin = false;
                    play= false;
                }
            }
        }
    },
    
    render:function() {
        //game.debug.text(this.ball.anchor.y, 50, 50);
    }
};

game.state.add('bootState' , bootState);
game.state.add('roulletPreloadGame' , roulletPreloadGame);
game.state.add('roulletRenderGame', roulletRenderGame);

game.state.start('bootState');
