
/* global Phaser, PIXI */

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

/* Initialize Phaser */
var game = new Phaser.Game(1366, 768 , Phaser.CANVAS);

function goFull(){
    game.scale.startFullScreen(false);
}

function startRoullet(){
    goFull();
    this.state.start('roulletRenderGame');
}

var bootState = function() {
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

var roulletPreloadGame = function(){
    console.log("Loading roullet game");
};

roulletPreloadGame.prototype = {
    preload: function () {
        this.loading = this.add.sprite(700, 300, 'loading');
        this.loading.anchor.setTo(0.5, 0.5);

        this.load.image('wheel_frame' , 'assets/sprites/wheelframe.png');
        this.load.image('spin_wheel' , 'assets/sprites/spinwheel.png');
        this.load.image('table' , 'assets/sprites/table.png');
        
        game.load.spritesheet('startButton', 'assets/spritesheet/startButton.png', 200, 100);
    },
    create: function () {
        this.state.start('roulletStartGame');
    }
};

var roulletStartGame = function(){
    console.log("Roullet Game start screen");
};

roulletStartGame.prototype = {
    create: function() {
        this.startButton = this.add.button(game.world.centerX - 95, 400, 'startButton', startRoullet, this, 2, 1, 0);
    }
};    

var roulletRenderGame = function() {
    console.log("Render roullet game");
};

roulletRenderGame.prototype = {
    
    create: function() {
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        game.time.desiredFps = 60;
        
        console.log(window.innerHeight);
        console.log(window.innerWidth);
        
        this.table = this.add.sprite(game.world.centerX, game.world.centerY-75, 'table');
        this.table.scale.setTo(0.8, 0.8);
        this.table.anchor.setTo(0.5, 0.5);
        
        this.wheel_frame = this.add.sprite(300, game.world.centerY-75, 'wheel_frame');
        this.spin_wheel = this.add.sprite(300, game.world.centerY-75, 'spin_wheel');
        
        this.wheel_frame.scale.setTo(0.6, 0.6);
        this.wheel_frame.anchor.setTo(0.5 , 0.5);
        
        this.spin_wheel.scale.setTo(0.6, 0.6);
        this.spin_wheel.anchor.setTo(0.5 , 0.5);
        
    },

    update: function() {
        
    },
    
    render:function() {
        game.debug.inputInfo(32, 32);
    }
};

game.state.add('bootState' , bootState);
game.state.add('roulletPreloadGame' , roulletPreloadGame);
game.state.add('roulletStartGame', roulletStartGame);
game.state.add('roulletRenderGame', roulletRenderGame);

game.state.start('bootState');