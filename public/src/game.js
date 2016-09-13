
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
    'url': 'mechanics/test.json',
    'dataType': "json",
    'success': function (data) {
        playerid = data.userid;
        cashbalance = data.cashbalance;
        gameid = data.gameid;
    }
});

/* canvas height and width */
var width = 1366; // window.innerWidth
var height = 768; // window.innerHeight

/* global Phaser */
var game = new Phaser.Game(width, height, Phaser.AUTO, '');

var Roullet = function() {}

Roullet.prototype{
    preload: function(){
        game.load.image('wheel' , 'assets/sprites/Roulettewheel.png');
    }
    create: function(){
        game.add.sprite('wheel' , 300 , 300);
    }
    update: function(){

    }
}

game.state.add('Roullet', Roullet);
game.state.start('Roullet');
