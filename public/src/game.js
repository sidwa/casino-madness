
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

/* canvas height and width */
var width = window.innerWidth;
var height = window.innerHeight;

/* Initialize Phaser */
var game = new Phaser.Game(width , height , Phaser.AUTO);

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
        this.loading = this.add.sprite((height/2), (width/2), 'loading');
        this.loading.anchor.setTo(0.5, 0.5);

        this.load.image('wheel' , 'assets/sprites/Roulettewheel.png');
    },
    create: function () {
        this.state.start('roulletRenderGame');
    }
};

var roulletRenderGame = function(game) {
    console.log("Render roullet game");
};

roulletRenderGame.prototype = {

    create: function() {
        this.wheel = this.add.sprite(300, 300, 'wheel');
        this.wheel.scale.setTo(0.6, 0.6);
        this.wheel.anchor.setTo(0.5 , 0.5);
    },

    update: function() {
        this.wheel.angle += 2;
    }
};

game.state.add('bootState' , bootState);
game.state.add('roulletPreloadGame' , roulletPreloadGame);
game.state.add('roulletRenderGame', roulletRenderGame);

game.state.start('bootState');
