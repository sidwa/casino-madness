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
    
    wheel.animations.play('rotate', 23, true);
}

function update() {
}

