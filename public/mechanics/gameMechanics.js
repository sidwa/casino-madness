/* global Phaser */
window.PIXI = require('phaser/build/custom/pixi');
window.p2 = require('phaser/build/custom/p2');
window.Phaser = require('phaser/build/custom/phaser-split');

var width = window.innerWidth;
var height = window.innerHeight;

var game = new Phaser.Game(width, height, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    game.load.spritesheet('wheel_initiate', 'assets/spritesheets/wheel_intiatiate.png', 600, 600, 30);
    game.load.spritesheet('wheel_rotate', 'assets/spritesheets/wheel_rotate.png', 600, 600, 30);
}

function create() {
    playWheelAnimation();
}

function update() {
    
}

function playWheelAnimation(){
    var wheel_rotate = game.add.sprite(0, 0, 'wheel_rotate');
    wheel_rotate.scale.setTo(1,1);
    wheel_rotate.animations.add('rotate');
    
    var wheel_initiate = game.add.sprite(0, 0, 'wheel_initiate');
    var count = 0;
    
    wheel_initiate.scale.setTo(1,1);
    wheel_initiate.animations.add('rotate_begin');
    
    wheel_initiate.animations.play('rotate_begin',15,false);
    wheel_initiate.events.onAnimationComplete.add(function(){
        wheel_initiate.destroy();
        
        wheel_rotate.animations.play('rotate',15,true);
        wheel_rotate.events.onAnimationLoop.add(function(){
           if(count >= 2){
                wheel_rotate.animations.stop();
                //wheel_rotate.destroy();
           }
           count++;
        });
    });
}
