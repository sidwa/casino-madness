/* global Phaser */

var width = window.innerWidth;
var height = window.innerHeight;

var game = new Phaser.Game(width, height, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    game.load.spritesheet('wheel', 'assets/wheel.png', 600, 600, 45);
}

function create() {
    var wheel = game.add.sprite(0, 0, 'wheel');
    var scale = wheel.scale.setTo(1,1);
    var rotate = wheel.animations.add('rotate');
    
<<<<<<< HEAD
    //wheel aniation with 3 loops
    wheel.animations.add('rotate');
    var count = 0;
    wheel.animations.play('rotate',30,true);
    wheel.events.onAnimationLoop.add(function(){
        if(count > 2){
            wheel.animations.stop();
        }
        count++;
    });
=======
    wheel.animations.play('rotate', 23, true);
>>>>>>> 0be4af526d02007c66c166760574c67696987101
}

function update() {
}

