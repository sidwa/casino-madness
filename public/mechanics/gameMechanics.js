/* global Phaser */
window.PIXI = require('phaser/build/custom/pixi');
window.p2 = require('phaser/build/custom/p2');
window.Phaser = require('phaser/build/custom/phaser-split');

var width = window.innerWidth;
var height = window.innerHeight;

var game = new Phaser.Game(width, height, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    game.load.spritesheet('wheel', 'assets/wheel.png', 600, 600, 30);
}

function create() {
    var wheel = game.add.sprite(0, 0, 'wheel');
    
    wheel.animations.add('rotate');
    var count = 0;
    wheel.animations.play('rotate',30,true);
    wheel.events.onAnimationLoop.add(function(){
        if(count > 2){
            wheel.animations.stop();
        }
        count++;
    });
}

function update() {
    
}
