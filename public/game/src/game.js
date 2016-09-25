
/* global Phaser, PIXI */

/* jquery node module */
//var $ = require('jquery');

/* phaser node module */
// window.PIXI = require('phaser/build/custom/pixi');
// window.p2 = require('phaser/build/custom/p2');
// window.Phaser = require('phaser/build/custom/phaser-split');

/* Initialize Phaser */
var game = new Phaser.Game(1366, 768 , Phaser.CANVAS);

var loading;
var startButton;

function goFull(){
    game.scale.startFullScreen(false);
}

function quit(){
    alert('Fcking Noob!');
}

var bootState = function() {
    console.log("Initialize");
};

bootState.prototype = {
    preload: function(){
        game.load.image('loading', 'assets/sprites/loading.png');
    },
    create: function(){
        //game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.state.start('roulletPreloadGame');
    }
};

/* Roullet Game */

var quitButton;
var fullButton;

var slot_00;
var slot_0;

var slot_1;
var slot_2;
var slot_3;
var slot_4;
var slot_5;
var slot_6;
var slot_7;
var slot_8;
var slot_9;
var slot_10;
var slot_11;
var slot_12;
var slot_13;
var slot_14;
var slot_15;
var slot_16;
var slot_17;
var slot_18;
var slot_19;
var slot_20;
var slot_21;
var slot_22;
var slot_23;
var slot_24;
var slot_25;
var slot_26;
var slot_27;
var slot_28;
var slot_29;
var slot_30;
var slot_31;
var slot_32;
var slot_33;
var slot_34;
var slot_35;
var slot_36;

var slot_2to1_1;
var slot_2to1_2;
var slot_2to1_3;

var slot_1_12;
var slot_2_12;
var slot_3_12;

var slot_1_to_18;
var slot_19_to_36;

var slot_odd;
var slot_even;
var slot_red;
var slot_black;

var normal_slots;
var special_slots;

var pointer;
var normal_input_mode = false;
var bet_input = [];

var angle_map = [
    {"slot": "00" , "position": "0"},
    {"slot": "27" , "position": "1"},
    {"slot": "10" , "position": "2"},
    {"slot": "25" , "position": "3"},
    {"slot": "29" , "position": "4"},
    {"slot": "12" , "position": "5"},
    {"slot": "8" , "position": "6"},
    {"slot": "19" , "position": "7"},
    {"slot": "31" , "position": "8"},
    {"slot": "18" , "position": "9"},
    {"slot": "6" , "position": "10"},
    {"slot": "21" , "position": "11"},
    {"slot": "33" , "position": "12"},
    {"slot": "16" , "position": "13"},
    {"slot": "4" , "position": "14"},
    {"slot": "23" , "position": "15"},
    {"slot": "33" , "position": "16"},
    {"slot": "14" , "position": "17"},
    {"slot": "2" , "position": "18"},
    {"slot": "0" , "position": "19"},
    {"slot": "28" , "position": "20"},
    {"slot": "9" , "position": "21"},
    {"slot": "26" , "position": "22"},
    {"slot": "30" , "position": "23"},
    {"slot": "11" , "position": "24"},
    {"slot": "7" , "position": "25"},
    {"slot": "20" , "position": "26"},
    {"slot": "32" , "position": "27"},
    {"slot": "17" , "position": "28"},
    {"slot": "5" , "position": "29"},
    {"slot": "22" , "position": "30"},
    {"slot": "34" , "position": "31"},
    {"slot": "15" , "position": "32"},
    {"slot": "3" , "position": "33"},
    {"slot": "24" , "position": "34"},
    {"slot": "36" , "position": "35"},
    {"slot": "31" , "position": "36"},
    {"slot": "1" , "position": "37"}
];

function startRoullet(){
    goFull();
    game.state.start('roulletRenderGame');
}

function spin(slot){

    var selector_x = 300;
    var selector_y = game.world.centerY-75;
    var selector_scale = 0.65;
    var selector_anchor_x = 0.5;
    var selector_anchor_y = 0.5;
    var selector_angle;
    var time = 5000;

    this.selector = game.add.sprite(selector_x, selector_y, 'selector');
    this.selector.scale.setTo(selector_scale, selector_scale);
    this.selector.anchor.setTo(selector_anchor_x, selector_anchor_y);

    for(var i = 0 ; i < 38 ; i++){
        if(angle_map[i].slot === slot){
            selector_angle = angle_map[i].position;
            console.log(selector_angle);
            break;
        }
    }
    selector_angle = selector_angle * 9.47;
    console.log(selector_angle);
    var rounds = game.rnd.between(4, 6);
    var spinTween = game.add.tween(this.selector).to({angle: 360 * rounds + selector_angle}, time, Phaser.Easing.Quadratic.InOut, true);

}

function over (sprite){
    sprite.alpha = 0.5;
}

function out (sprite){
    sprite.alpha = 1;
}

function place_multiple(bet){
    console.log(bet);
    return true;
}

function place_single(sprite){
    console.log(sprite.key);
}

function checkOverlap(sprite, rectangle) {

    var bounds = sprite.getBounds();
    var rect_sprite = new Phaser.Rectangle(bounds.x, bounds.y, bounds.width, bounds.height);

    var intersection = Phaser.Rectangle.intersects(rect_sprite, rectangle);

    return intersection;
}

var roulletPreloadGame = function(){
    console.log("Loading roullet game");
};

roulletPreloadGame.prototype = {
    preload: function () {
        loading = game.add.sprite(700, 300, 'loading');
        loading.anchor.setTo(0.5, 0.5);

        game.load.image('wheel', 'assets/sprites/wheel.png');
        game.load.image('selector', 'assets/sprites/selector.png');
        game.load.image('table' , 'assets/sprites/table.png');

        game.load.image('slot_0', 'assets/sprites/87x150/0.png');
        game.load.image('slot_00', 'assets/sprites/87x150/00.png');

        game.load.image('slot_1', 'assets/sprites/73x100/1.png');
        game.load.image('slot_2', 'assets/sprites/73x100/2.png');
        game.load.image('slot_3', 'assets/sprites/73x100/3.png');
        game.load.image('slot_4', 'assets/sprites/73x100/4.png');
        game.load.image('slot_5', 'assets/sprites/73x100/5.png');
        game.load.image('slot_6', 'assets/sprites/73x100/6.png');
        game.load.image('slot_7', 'assets/sprites/73x100/7.png');
        game.load.image('slot_8', 'assets/sprites/73x100/8.png');
        game.load.image('slot_9', 'assets/sprites/73x100/9.png');
        game.load.image('slot_10', 'assets/sprites/73x100/10.png');
        game.load.image('slot_11', 'assets/sprites/73x100/11.png');
        game.load.image('slot_12', 'assets/sprites/73x100/12.png');
        game.load.image('slot_13', 'assets/sprites/73x100/13.png');
        game.load.image('slot_14', 'assets/sprites/73x100/14.png');
        game.load.image('slot_15', 'assets/sprites/73x100/15.png');
        game.load.image('slot_16', 'assets/sprites/73x100/16.png');
        game.load.image('slot_17', 'assets/sprites/73x100/17.png');
        game.load.image('slot_18', 'assets/sprites/73x100/18.png');
        game.load.image('slot_19', 'assets/sprites/73x100/19.png');
        game.load.image('slot_20', 'assets/sprites/73x100/20.png');
        game.load.image('slot_21', 'assets/sprites/73x100/21.png');
        game.load.image('slot_22', 'assets/sprites/73x100/22.png');
        game.load.image('slot_23', 'assets/sprites/73x100/23.png');
        game.load.image('slot_24', 'assets/sprites/73x100/24.png');
        game.load.image('slot_25', 'assets/sprites/73x100/25.png');
        game.load.image('slot_26', 'assets/sprites/73x100/26.png');
        game.load.image('slot_27', 'assets/sprites/73x100/27.png');
        game.load.image('slot_28', 'assets/sprites/73x100/28.png');
        game.load.image('slot_29', 'assets/sprites/73x100/29.png');
        game.load.image('slot_30', 'assets/sprites/73x100/30.png');
        game.load.image('slot_31', 'assets/sprites/73x100/31.png');
        game.load.image('slot_32', 'assets/sprites/73x100/32.png');
        game.load.image('slot_33', 'assets/sprites/73x100/33.png');
        game.load.image('slot_34', 'assets/sprites/73x100/34.png');
        game.load.image('slot_35', 'assets/sprites/73x100/35.png');
        game.load.image('slot_36', 'assets/sprites/73x100/36.png');

        game.load.image('slot_2to1_1', 'assets/sprites/73x100/2to1-1.png');
        game.load.image('slot_2to1_2', 'assets/sprites/73x100/2to1-2.png');
        game.load.image('slot_2to1_3', 'assets/sprites/73x100/2to1-3.png');

        game.load.image('slot_1-12', 'assets/sprites/292x92/1-12.png');
        game.load.image('slot_2-12', 'assets/sprites/292x92/2-12.png');
        game.load.image('slot_3-12', 'assets/sprites/292x92/3-12.png');

        game.load.image('slot_1-18', 'assets/sprites/146x92/1-18.png');
        game.load.image('slot_19-36', 'assets/sprites/146x92/19-36.png');
        game.load.image('slot_black', 'assets/sprites/146x92/black.png');
        game.load.image('slot_red', 'assets/sprites/146x92/red.png');
        game.load.image('slot_even', 'assets/sprites/146x92/even.png');
        game.load.image('slot_odd', 'assets/sprites/146x92/odd.png');

        game.load.image('pointer', 'assets/sprites/pointer.png');
        
        game.load.image('bg', 'assets/background.png');
        game.load.spritesheet('startButton', 'assets/spritesheet/startButton.png', 200, 100);
        game.load.spritesheet('quitButton', 'assets/spritesheet/quitButton.png', 250, 100);
        game.load.spritesheet('fullButton', 'assets/spritesheet/fullButton.png', 250, 100);
    },
    create: function () {
        game.state.start('roulletRenderGame');
    }
};

var roulletStartGame = function(){
    console.log("Roullet Game start screen");
};

roulletStartGame.prototype = {
    create: function() {
        startButton = game.add.button(game.world.centerX - 95, 400, 'startButton', startRoullet, this, 2, 1, 0);
    }
};    

var roulletRenderGame = function() {
    console.log("Render roullet game");
};

roulletRenderGame.prototype = {
    
    create: function() {
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        game.time.desiredFps = 60;
        game.input.mouse.capture = true;
        
        var table_x = game.world.centerX;
        var table_y = game.world.centerY-75;
        var table_scale = 0.8;
        var table_anchor_x = 0.5;
        var table_anchor_y = 0.5;

        var wheel_x = 300;
        var wheel_y = game.world.centerY-75;
        var wheel_scale = 0.65;
        var wheel_anchor_x = 0.5;
        var wheel_anchor_y = 0.5;

        var number_position_x = 550;
        var number_position_y = 150;
        var number_scale = 0.65;

        var number_block_1_resolution_x = 87;
        var number_block_1_resolution_y = 150;

        var number_block_2_resolution_x = 73;
        var number_block_2_resolution_y = 100;

        var number_block_3_resolution_x = 292;
        var number_block_3_resolution_y = 92;
        
        var number_block_4_resolution_x = 146;
        var number_block_4_resolution_y = 92;

        var fullButton_scale = 0.4;
        var quitButton_scale = 0.4;

        game.add.tileSprite(0, 0, 1366, 768, 'bg');

        quitButton = game.add.button(1200, 10, 'quitButton', quit, this, 2, 1, 0);
        fullButton = game.add.button(20, 10, 'fullButton', goFull, this, 2, 1, 0);

        quitButton.scale.setTo(quitButton_scale, quitButton_scale);
        fullButton.scale.setTo(fullButton_scale, fullButton_scale);
    
        table = game.add.sprite(table_x, table_y, 'table');
        table.scale.setTo(table_scale, table_scale);
        table.anchor.setTo(table_anchor_x, table_anchor_y);
        
        wheel = game.add.sprite(wheel_x, wheel_y, 'wheel');
        wheel.scale.setTo(wheel_scale, wheel_scale);
        wheel.anchor.setTo(wheel_anchor_x, wheel_anchor_y);

        slot_0 = game.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*0)), (number_position_y+(number_scale*number_block_1_resolution_y*0)) , 'slot_0');
        slot_0.scale.setTo(number_scale, number_scale);
        slot_00 = game.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*0)), (number_position_y+(number_scale*number_block_1_resolution_y*1)), 'slot_00');
        slot_00.scale.setTo(number_scale, number_scale);

        slot_1 = game.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)), (number_position_y+(number_scale*number_block_2_resolution_y*2)), 'slot_1');
        slot_1.scale.setTo(number_scale, number_scale);
        slot_2 = game.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)), (number_position_y+(number_scale*number_block_2_resolution_y*1)), 'slot_2');
        slot_2.scale.setTo(number_scale, number_scale);
        slot_3 = game.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)), (number_position_y+(number_scale*number_block_2_resolution_y*0)), 'slot_3');
        slot_3.scale.setTo(number_scale, number_scale);

        slot_4 = game.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*1)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*2)), 'slot_4');
        slot_4.scale.setTo(number_scale, number_scale);
        slot_5 = game.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*1)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*1)), 'slot_5');
        slot_5.scale.setTo(number_scale, number_scale);
        slot_6 = game.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*1)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*0)), 'slot_6');
        slot_6.scale.setTo(number_scale, number_scale);

        slot_7 = game.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*2)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*2)), 'slot_7');
        slot_7.scale.setTo(number_scale, number_scale);
        slot_8 = game.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*2)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*1)), 'slot_8');
        slot_8.scale.setTo(number_scale, number_scale);
        slot_9 = game.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*2)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*0)), 'slot_9');
        slot_9.scale.setTo(number_scale, number_scale);

        slot_10 = game.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*3)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*2)), 'slot_10');
        slot_10.scale.setTo(number_scale, number_scale);
        slot_11 = game.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*3)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*1)), 'slot_11');
        slot_11.scale.setTo(number_scale, number_scale);
        slot_12 = game.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*3)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*0)), 'slot_12');
        slot_12.scale.setTo(number_scale, number_scale);

        slot_13 = game.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*4)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*2)), 'slot_13');
        slot_13.scale.setTo(number_scale, number_scale);
        slot_14 = game.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*4)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*1)), 'slot_14');
        slot_14.scale.setTo(number_scale, number_scale);
        slot_15 = game.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*4)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*0)), 'slot_15');
        slot_15.scale.setTo(number_scale, number_scale);

        slot_16 = game.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*5)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*2)), 'slot_16');
        slot_16.scale.setTo(number_scale, number_scale);
        slot_17 = game.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*5)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*1)), 'slot_17');
        slot_17.scale.setTo(number_scale, number_scale);
        slot_18 = game.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*5)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*0)), 'slot_18');
        slot_18.scale.setTo(number_scale, number_scale);

        slot_19 = game.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*6)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*2)), 'slot_19');
        slot_19.scale.setTo(number_scale, number_scale);
        slot_20 = game.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*6)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*1)), 'slot_20');
        slot_20.scale.setTo(number_scale, number_scale);
        slot_21 = game.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*6)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*0)), 'slot_21');
        slot_21.scale.setTo(number_scale, number_scale);

        slot_22 = game.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*7)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*2)), 'slot_22');
        slot_22.scale.setTo(number_scale, number_scale);
        slot_23 = game.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*7)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*1)), 'slot_23');
        slot_23.scale.setTo(number_scale, number_scale);
        slot_24 = game.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*7)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*0)), 'slot_24');
        slot_24.scale.setTo(number_scale, number_scale);

        slot_25 = game.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*8)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*2)), 'slot_25');
        slot_25.scale.setTo(number_scale, number_scale);
        slot_26 = game.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*8)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*1)), 'slot_26');
        slot_26.scale.setTo(number_scale, number_scale);
        slot_27 = game.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*8)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*0)), 'slot_27');
        slot_27.scale.setTo(number_scale, number_scale);

        slot_28 = game.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*9)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*2)), 'slot_28');
        slot_28.scale.setTo(number_scale, number_scale);
        slot_29 = game.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*9)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*1)), 'slot_29');
        slot_29.scale.setTo(number_scale, number_scale);
        slot_30 = game.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*9)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*0)), 'slot_30');
        slot_30.scale.setTo(number_scale, number_scale);

        slot_31 = game.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*10)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*2)), 'slot_31');
        slot_31.scale.setTo(number_scale, number_scale);
        slot_32 = game.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*10)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*1)), 'slot_32');
        slot_32.scale.setTo(number_scale, number_scale);
        slot_33 = game.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*10)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*0)), 'slot_33');
        slot_33.scale.setTo(number_scale, number_scale);

        slot_34 = game.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*11)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*2)), 'slot_34');
        slot_34.scale.setTo(number_scale, number_scale);
        slot_35 = game.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*11)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*1)), 'slot_35');
        slot_35.scale.setTo(number_scale, number_scale);
        slot_36 = game.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*11)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*0)), 'slot_36');
        slot_36.scale.setTo(number_scale, number_scale);

        slot_2to1_1 = game.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*12)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*2)), 'slot_2to1_1');
        slot_2to1_1.scale.setTo(number_scale, number_scale);
        slot_2to1_2 = game.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*12)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*1)), 'slot_2to1_2');
        slot_2to1_2.scale.setTo(number_scale, number_scale);
        slot_2to1_3 = game.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*12)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*0)), 'slot_2to1_3');
        slot_2to1_3.scale.setTo(number_scale, number_scale);

        slot_1_12 = game.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_3_resolution_x*0)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*3)), 'slot_1-12');
        slot_1_12.scale.setTo(number_scale, number_scale);
        slot_2_12 = game.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_3_resolution_x*1)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*3)), 'slot_2-12');
        slot_2_12.scale.setTo(number_scale, number_scale);
        slot_3_12 = game.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_3_resolution_x*2)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*3)), 'slot_3-12');
        slot_3_12.scale.setTo(number_scale, number_scale);

        slot_1_to_18 = game.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_4_resolution_x*0)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*3)+(number_scale*number_block_3_resolution_y*1)), 'slot_1-18');
        slot_1_to_18.scale.setTo(number_scale, number_scale);
        slot_even = game.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_4_resolution_x*1)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*3)+(number_scale*number_block_3_resolution_y*1)), 'slot_even');
        slot_even.scale.setTo(number_scale, number_scale);
        slot_red = game.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_4_resolution_x*2)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*3)+(number_scale*number_block_3_resolution_y*1)), 'slot_red');
        slot_red.scale.setTo(number_scale, number_scale);
        slot_black = game.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_4_resolution_x*3)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*3)+(number_scale*number_block_3_resolution_y*1)), 'slot_black');
        slot_black.scale.setTo(number_scale, number_scale);
        slot_odd = game.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_4_resolution_x*4)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*3)+(number_scale*number_block_3_resolution_y*1)), 'slot_odd');
        slot_odd.scale.setTo(number_scale, number_scale);
        slot_19_to_36 = game.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_4_resolution_x*5)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*3)+(number_scale*number_block_3_resolution_y*1)), 'slot_19-36');
        slot_19_to_36.scale.setTo(number_scale, number_scale);

        pointer = new Phaser.Rectangle(0, 0, 40, 40);
        
        normal_slots = game.add.group();
        normal_slots.inputEnableChildren = true;
        normal_slots.addMultiple([slot_1, slot_2, slot_3, slot_4, slot_5, slot_6, slot_7, slot_8, slot_9, slot_10, slot_11, slot_12, slot_12, slot_13, slot_14, slot_15, slot_16, slot_17, slot_18, slot_19, slot_20, slot_21, slot_22, slot_23, slot_24, slot_25, slot_26, slot_27, slot_28, slot_29,slot_30, slot_31, slot_32, slot_33, slot_34, slot_35, slot_36]);

        special_slots = game.add.group();
        special_slots.inputEnableChildren = true;
        special_slots.addMultiple([slot_0, slot_00, slot_2to1_1, slot_2to1_2, slot_2to1_3, slot_1_12, slot_2_12, slot_3_12, slot_1_to_18, slot_19_to_36, slot_odd, slot_even, slot_red, slot_black]);

    },

    update: function() {

        if(game.scale.isFullScreen){
            fullButton.visible = false;
        }
        else{
            fullButton.visible = true;
        }
        
        normal_slots.onChildInputOver.add(function (){
            normal_input_mode = true;
        }, this);
        normal_slots.onChildInputOut.add(function () {
            normal_input_mode = false;
        }, this);
        
        if(normal_input_mode){
            pointer.x = game.input.mousePointer.x-20;
            pointer.y = game.input.mousePointer.y-20;
        }
        else{
            pointer.x = 0;
            pointer.y = 0;
        }
        
        normal_slots.forEach(function (item){
            if(checkOverlap(item , pointer)){
                over(item);
                if(game.input.activePointer.leftButton.isDown){
                    if($.inArray(item.key, bet_input) === -1){
                        bet_input.push(item.key);
                    }
                }
                if(game.input.activePointer.leftButton.isUp && bet_input.length > 0){
                    if(place_multiple(bet_input)){
                        bet_input = [];
                    }
                }
            }
            else{
                out(item);
            }
        });
        
        special_slots.onChildInputOver.add(over, this);
        special_slots.onChildInputOut.add(out, this);
        special_slots.onChildInputDown.add(place_single, this);
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