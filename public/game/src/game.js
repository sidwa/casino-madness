/* global Phaser */

/* jquery node module */
//var $ = require('jquery');

/* phaser node module */
// window.PIXI = require('phaser/build/custom/pixi');
// window.p2 = require('phaser/build/custom/p2');
// window.Phaser = require('phaser/build/custom/phaser-split');

/* New Phaser Instance*/
var game = new Phaser.Game(1366, 768, Phaser.CANVAS);

var loading;
var startButton;

function goFull() {
    if (game.scale.isFullScreen){
        game.scale.stopFullScreen();
    }
    else{
        game.scale.startFullScreen(false);
    }
}

function quit() {
    alert('Fcking Noob!');
}

var bootState = function() {
    console.log("Initialize");
};

bootState.prototype = {
    preload: function() {
        game.load.image('loading', 'assets/sprites/loading.png');
    },
    create: function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        game.time.desiredFps = 60;
        game.input.mouse.capture = true;
        game.state.start('roulletPreloadGame');
    }
};

/* Roullet Game */

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

/* sprite details */
var table_x = (1366/2);
var table_y = (768/2) - 75;
var table_scale = 0.8;
var table_anchor_x = 0.5;
var table_anchor_y = 0.5;

var wheel_x = 300;
var wheel_y = (768/2) - 75;
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

/* buttons */
var quitButton;
var fullButton;

var fullButton_scale = 0.3;
var quitButton_scale = 0.3;

/* sprite groups */
var normal_slots;
var special_slots;
var input_poker_chip_group;

/* HUD */
var hud_background;

var pokerchip_100;
var pokerchip_500;
var pokerchip_1000;

/* input */
var selected_chip_value = null;
var chip_select;
var pointer;
var normal_input_mode = false;
var bet_input = [];
var final_bets = [];

SELECTOR = function (game, slot_number) {

    this.game = game;
    this.selector_x = 300;
    this.selector_y = game.world.centerY - 75;
    this.selector_scale = 0.65;
    this.selector_anchor_x = 0.5;
    this.selector_anchor_y = 0.5;
    this.time = 7000;

    this.angle_map = [
        { "slot": "00", "position": "0" },
        { "slot": "27", "position": "1" },
        { "slot": "10", "position": "2" },
        { "slot": "25", "position": "3" },
        { "slot": "29", "position": "4" },
        { "slot": "12", "position": "5" },
        { "slot": "8", "position": "6" },
        { "slot": "19", "position": "7" },
        { "slot": "31", "position": "8" },
        { "slot": "18", "position": "9" },
        { "slot": "6", "position": "10" },
        { "slot": "21", "position": "11" },
        { "slot": "33", "position": "12" },
        { "slot": "16", "position": "13" },
        { "slot": "4", "position": "14" },
        { "slot": "23", "position": "15" },
        { "slot": "33", "position": "16" },
        { "slot": "14", "position": "17" },
        { "slot": "2", "position": "18" },
        { "slot": "0", "position": "19" },
        { "slot": "28", "position": "20" },
        { "slot": "9", "position": "21" },
        { "slot": "26", "position": "22" },
        { "slot": "30", "position": "23" },
        { "slot": "11", "position": "24" },
        { "slot": "7", "position": "25" },
        { "slot": "20", "position": "26" },
        { "slot": "32", "position": "27" },
        { "slot": "17", "position": "28" },
        { "slot": "5", "position": "29" },
        { "slot": "22", "position": "30" },
        { "slot": "34", "position": "31" },
        { "slot": "15", "position": "32" },
        { "slot": "3", "position": "33" },
        { "slot": "24", "position": "34" },
        { "slot": "36", "position": "35" },
        { "slot": "31", "position": "36" },
        { "slot": "1", "position": "37" }
    ];

    this.selector_sprite = game.add.sprite(this.selector_x, this.selector_y, 'selector');
    this.selector_sprite.scale.setTo(this.selector_scale, this.selector_scale);
    this.selector_sprite.anchor.setTo(this.selector_anchor_x, this.selector_anchor_y);

    for (var i = 0; i < 38; i++) {
        if (this.angle_map[i].slot === slot_number) {
            this.selector_angle = this.angle_map[i].position;
            break;
        }
    }

    this.selector_angle = this.selector_angle * 9.47;
    this.rounds = game.rnd.between(4, 7);
};

SELECTOR.prototype.play = function () {
    this.spinTween = game.add.tween(this.selector_sprite).to({ angle: 360 * this.rounds + this.selector_angle }, this.time, Phaser.Easing.Quadratic.InOut, true);
};

POKER_CHIP = function (game, color, slot_info, chip_value) {
    this.game = game;
    this.color = color;
    this.slot_info = slot_info;
    this.no_of_chips = this.slot_info.length;
    this.chip_value = chip_value;
    this.sprite_group = null;
    this.sprite_index = null;
    this.poker_chip_x = null;
    this.poker_chip_y = null;
    this.poker_chip = null;
    this.poker_chip_scale = 0.059;
    this.poker_chip_anchor_x = 0.5;
    this.poker_chip_anchor_y = 0.5;

    var slot_key_to_sprite = [
        {"key":"00", "sprite_group": "special", "sprite_index" : 1},
        {"key":"0", "sprite_group": "special", "sprite_index" : 0},
        {"key":"1", "sprite_group": "normal", "sprite_index" : 0},
        {"key":"2", "sprite_group": "normal", "sprite_index" : 1},
        {"key":"3", "sprite_group": "normal", "sprite_index" : 2},
        {"key":"4", "sprite_group": "normal", "sprite_index" : 3},
        {"key":"5", "sprite_group": "normal", "sprite_index" : 4},
        {"key":"6", "sprite_group": "normal", "sprite_index" : 5},
        {"key":"7", "sprite_group": "normal", "sprite_index" : 6},
        {"key":"8", "sprite_group": "normal", "sprite_index" : 7},
        {"key":"9", "sprite_group": "normal", "sprite_index" : 8},
        {"key":"10", "sprite_group": "normal", "sprite_index" : 9},
        {"key":"11", "sprite_group": "normal", "sprite_index" : 10},
        {"key":"12", "sprite_group": "normal", "sprite_index" : 11},
        {"key":"13", "sprite_group": "normal", "sprite_index" : 12},
        {"key":"14", "sprite_group": "normal", "sprite_index" : 13},
        {"key":"15", "sprite_group": "normal", "sprite_index" : 14},
        {"key":"16", "sprite_group": "normal", "sprite_index" : 15},
        {"key":"17", "sprite_group": "normal", "sprite_index" : 16},
        {"key":"18", "sprite_group": "normal", "sprite_index" : 17},
        {"key":"19", "sprite_group": "normal", "sprite_index" : 18},
        {"key":"20", "sprite_group": "normal", "sprite_index" : 19},
        {"key":"21", "sprite_group": "normal", "sprite_index" : 20},
        {"key":"22", "sprite_group": "normal", "sprite_index" : 21},
        {"key":"23", "sprite_group": "normal", "sprite_index" : 22},
        {"key":"24", "sprite_group": "normal", "sprite_index" : 23},
        {"key":"25", "sprite_group": "normal", "sprite_index" : 24},
        {"key":"26", "sprite_group": "normal", "sprite_index" : 25},
        {"key":"27", "sprite_group": "normal", "sprite_index" : 26},
        {"key":"28", "sprite_group": "normal", "sprite_index" : 27},
        {"key":"29", "sprite_group": "normal", "sprite_index" : 28},
        {"key":"30", "sprite_group": "normal", "sprite_index" : 29},
        {"key":"31", "sprite_group": "normal", "sprite_index" : 30},
        {"key":"32", "sprite_group": "normal", "sprite_index" : 31},
        {"key":"33", "sprite_group": "normal", "sprite_index" : 32},
        {"key":"34", "sprite_group": "normal", "sprite_index" : 33},
        {"key":"35", "sprite_group": "normal", "sprite_index" : 34},
        {"key":"36", "sprite_group": "normal", "sprite_index" : 35},
        {"key":"2to1_1", "sprite_group": "special", "sprite_index" : 2},
        {"key":"2to1_2", "sprite_group": "special", "sprite_index" : 3},
        {"key":"2to1_3", "sprite_group": "special", "sprite_index" : 4},
        {"key":"1st12", "sprite_group": "special", "sprite_index" : 5},
        {"key":"2nd12", "sprite_group": "special", "sprite_index" : 6},
        {"key":"3rd12", "sprite_group": "special", "sprite_index" : 7},
        {"key":"1to18", "sprite_group": "special", "sprite_index" : 8},
        {"key":"19to36", "sprite_group": "special", "sprite_index" : 9},
        {"key":"odd", "sprite_group": "special", "sprite_index" : 10},
        {"key":"even", "sprite_group": "special", "sprite_index" : 11},
        {"key":"red", "sprite_group": "special", "sprite_index" : 12},
        {"key":"black", "sprite_group": "special", "sprite_index" : 13},
        ];

    for(var i = 0 ; i < slot_key_to_sprite.length ; i++){
        if(this.slot_info[0] === slot_key_to_sprite[i].key){
            this.sprite_group = slot_key_to_sprite[i].sprite_group;
            this.sprite_index = slot_key_to_sprite[i].sprite_index;
            break;
        }
    }
    if(this.sprite_group === 'normal'){
        if(this.no_of_chips === 1){
            this.poker_chip_x = (normal_slots.children[this.sprite_index].centerX);
            this.poker_chip_y = (normal_slots.children[this.sprite_index].centerY);
        }
        else if (this.no_of_chips === 2){
            var second_chip_index = null;
            for(var j = 0 ; j < slot_key_to_sprite.length ; j++){
                if(this.slot_info[1] === slot_key_to_sprite[j].key){
                    second_chip_index = slot_key_to_sprite[j].sprite_index;
                    break;
                }
            }
            if((normal_slots.children[this.sprite_index].y > normal_slots.children[second_chip_index].y) && (normal_slots.children[this.sprite_index].x === normal_slots.children[second_chip_index].x)){
                this.poker_chip_x = (normal_slots.children[this.sprite_index].centerX);
                this.poker_chip_y = (normal_slots.children[this.sprite_index].y);
            }
            else if((normal_slots.children[this.sprite_index].x < normal_slots.children[second_chip_index].x) && (normal_slots.children[this.sprite_index].y === normal_slots.children[second_chip_index].y)){
                this.poker_chip_x = (normal_slots.children[second_chip_index].x);
                this.poker_chip_y = (normal_slots.children[this.sprite_index].centerY);   
            }
            else {
                console.log('Position not found');
            }
        }
        else if (this.no_of_chips === 4){
            this.poker_chip_x = normal_slots.children[this.sprite_index].x + (number_scale * number_block_2_resolution_y) - (512*this.poker_chip_scale/2);
            this.poker_chip_y = normal_slots.children[this.sprite_index].y;
        }
    }
    else if(this.sprite_group === 'special'){
        this.poker_chip_x = special_slots.children[this.sprite_index].centerX;
        this.poker_chip_y = special_slots.children[this.sprite_index].centerY;
    }
    else {
        console.log('Group not found');
    }

    if(this.color === "blue"){
        if(this.chip_value === 100){
            this.poker_chip = this.game.add.sprite(this.poker_chip_x, this.poker_chip_y , 'blue_100');
            this.poker_chip.anchor.setTo(this.poker_chip_anchor_x, this.poker_chip_anchor_y);
            this.poker_chip.scale.setTo(this.poker_chip_scale, this.poker_chip_scale);
        }
        else if(this.chip_value === 500){
            this.poker_chip = this.game.add.sprite(this.poker_chip_x, this.poker_chip_y , 'blue_500');
            this.poker_chip.anchor.setTo(this.poker_chip_anchor_x, this.poker_chip_anchor_y);
            this.poker_chip.scale.setTo(this.poker_chip_scale, this.poker_chip_scale);
        }
        else if(this.chip_value === 1000){
            this.poker_chip = this.game.add.sprite(this.poker_chip_x, this.poker_chip_y , 'blue_1000');
            this.poker_chip.anchor.setTo(this.poker_chip_anchor_x, this.poker_chip_anchor_y);
            this.poker_chip.scale.setTo(this.poker_chip_scale, this.poker_chip_scale);
        }
        else{
            console.log("POKER CHIP ERROR CODE: CHIP VALUE MISSING");
        }
    }
    else if(this.color === "green"){
        if(this.chip_value === 100){
            this.poker_chip = this.game.add.sprite(this.poker_chip_x, this.poker_chip_y , 'green_100');
            this.poker_chip.anchor.setTo(this.poker_chip_anchor_x, this.poker_chip_anchor_y);
            this.poker_chip.scale.setTo(this.poker_chip_scale, this.poker_chip_scale);
        }
        else if(this.chip_value === 500){
            this.poker_chip = this.game.add.sprite(this.poker_chip_x, this.poker_chip_y , 'green_500');
            this.poker_chip.anchor.setTo(this.poker_chip_anchor_x, this.poker_chip_anchor_y);
            this.poker_chip.scale.setTo(this.poker_chip_scale, this.poker_chip_scale);
        }
        else if(this.chip_value === 1000){
            this.poker_chip = this.game.add.sprite(this.poker_chip_x, this.poker_chip_y , 'green_1000');
            this.poker_chip.anchor.setTo(this.poker_chip_anchor_x, this.poker_chip_anchor_y);
            this.poker_chip.scale.setTo(this.poker_chip_scale, this.poker_chip_scale);
        }
        else{
            console.log("POKER CHIP ERROR CODE: CHIP VALUE MISSING");
        }
    }
    else if(this.color === "grey"){
        if(this.chip_value === 100){
            this.poker_chip = this.game.add.sprite(this.poker_chip_x, this.poker_chip_y , 'grey_100');
            this.poker_chip.anchor.setTo(this.poker_chip_anchor_x, this.poker_chip_anchor_y);
            this.poker_chip.scale.setTo(this.poker_chip_scale, this.poker_chip_scale);
        }
        else if(this.chip_value === 500){
            this.poker_chip = this.game.add.sprite(this.poker_chip_x, this.poker_chip_y , 'grey_500');
            this.poker_chip.anchor.setTo(this.poker_chip_anchor_x, this.poker_chip_anchor_y);
            this.poker_chip.scale.setTo(this.poker_chip_scale, this.poker_chip_scale);
        }
        else if(this.chip_value === 1000){
            this.poker_chip = this.game.add.sprite(this.poker_chip_x, this.poker_chip_y , 'grey_1000');
            this.poker_chip.anchor.setTo(this.poker_chip_anchor_x, this.poker_chip_anchor_y);
            this.poker_chip.scale.setTo(this.poker_chip_scale, this.poker_chip_scale);
        }
        else{
            console.log("POKER CHIP ERROR CODE: CHIP VALUE MISSING");
        }
    }
    else if(this.color === "purple"){
        if(this.chip_value === 100){
            this.poker_chip = this.game.add.sprite(this.poker_chip_x, this.poker_chip_y , 'purple_100');
            this.poker_chip.anchor.setTo(this.poker_chip_anchor_x, this.poker_chip_anchor_y);
            this.poker_chip.scale.setTo(this.poker_chip_scale, this.poker_chip_scale);
        }
        else if(this.chip_value === 500){
            this.poker_chip = this.game.add.sprite(this.poker_chip_x, this.poker_chip_y , 'purple_500');
            this.poker_chip.anchor.setTo(this.poker_chip_anchor_x, this.poker_chip_anchor_y);
            this.poker_chip.scale.setTo(this.poker_chip_scale, this.poker_chip_scale);
        }
        else if(this.chip_value === 1000){
            this.poker_chip = this.game.add.sprite(this.poker_chip_x, this.poker_chip_y , 'purple_1000');
            this.poker_chip.anchor.setTo(this.poker_chip_anchor_x, this.poker_chip_anchor_y);
            this.poker_chip.scale.setTo(this.poker_chip_scale, this.poker_chip_scale);
        }
        else{
            console.log("POKER CHIP ERROR CODE: CHIP VALUE MISSING");
        }
    }
    else if(this.color === "red"){
        if(this.chip_value === 100){
            this.poker_chip = this.game.add.sprite(this.poker_chip_x, this.poker_chip_y , 'red_100');
            this.poker_chip.anchor.setTo(this.poker_chip_anchor_x, this.poker_chip_anchor_y);
            this.poker_chip.scale.setTo(this.poker_chip_scale, this.poker_chip_scale);
        }
        else if(this.chip_value === 500){
            this.poker_chip = this.game.add.sprite(this.poker_chip_x, this.poker_chip_y , 'red_500');
            this.poker_chip.anchor.setTo(this.poker_chip_anchor_x, this.poker_chip_anchor_y);
            this.poker_chip.scale.setTo(this.poker_chip_scale, this.poker_chip_scale);
        }
        else if(this.chip_value === 1000){
            this.poker_chip = this.game.add.sprite(this.poker_chip_x, this.poker_chip_y , 'red_1000');
            this.poker_chip.anchor.setTo(this.poker_chip_anchor_x, this.poker_chip_anchor_y);
            this.poker_chip.scale.setTo(this.poker_chip_scale, this.poker_chip_scale);
        }
        else{
            console.log("POKER CHIP ERROR CODE: CHIP VALUE MISSING");
        }
    }
    else {
        console.log("POKER CHIP ERROR CODE: COLOR MISSING");
    }
};

CHIP_SELECTOR = function (game, chip_value){
    this.game = game;
    this.chip_value = chip_value;
};

CHIP_SELECTOR.prototype.createSelector = function (){
    this.chip_selector_x = 0;
    this.chip_selector_y = 0;

    if(this.chip_value === 100){
        this.chip_selector_x = game.world.centerX-300;
        this.chip_selector_y = game.world.centerY+300;
    }
    else if(this.chip_value === 500){
        this.chip_selector_x = game.world.centerX-150;
        this.chip_selector_y = game.world.centerY+300;
    }
    else if(this.chip_value === 1000){
        this.chip_selector_x = game.world.centerX;
        this.chip_selector_y = game.world.centerY+300;
    }
    else{
        console.log('ERROR in placeSELECTOR');
    }

    if(this.chip_selector_x !== 0 && this.chip_selector_y !== 0){
        this.chip_selector = this.game.add.sprite(this.chip_selector_x, this.chip_selector_y, 'chip_selector');
        this.chip_selector.scale.setTo(0.19, 0.19);
        this.chip_selector.anchor.setTo(0.5, 0.5);
    }
    else{
        console.log('ERROR in placeSELECTOR');
    }
}

CHIP_SELECTOR.prototype.removeSelector = function (chip_value){
    this.chip_selector.destroy();
};

function startRoullet() {
    goFull();
    game.state.start('roulletRenderGame');
}

function checkOverlap(sprite, rectangle) {

    var bounds = sprite.getBounds();
    var rect_sprite = new Phaser.Rectangle(bounds.x, bounds.y, bounds.width, bounds.height);

    var intersection = Phaser.Rectangle.intersects(rect_sprite, rectangle);

    return intersection;
}

function place_bet(bet_input){
    var final_bet_array = [];
    var slotName_to_value = [
        {"slot_name": "slot_00" , "slot_value": "00"},
        {"slot_name": "slot_0" , "slot_value": "0"},
        {"slot_name": "slot_1" , "slot_value": "1"},
        {"slot_name": "slot_2" , "slot_value": "2"},
        {"slot_name": "slot_3" , "slot_value": "3"},
        {"slot_name": "slot_4" , "slot_value": "4"},
        {"slot_name": "slot_5" , "slot_value": "5"},
        {"slot_name": "slot_6" , "slot_value": "6"},
        {"slot_name": "slot_7" , "slot_value": "7"},
        {"slot_name": "slot_8" , "slot_value": "8"},
        {"slot_name": "slot_9" , "slot_value": "9"},
        {"slot_name": "slot_10" , "slot_value": "10"},
        {"slot_name": "slot_11" , "slot_value": "11"},
        {"slot_name": "slot_12" , "slot_value": "12"},
        {"slot_name": "slot_13" , "slot_value": "13"},
        {"slot_name": "slot_14" , "slot_value": "14"},
        {"slot_name": "slot_15" , "slot_value": "15"},
        {"slot_name": "slot_16" , "slot_value": "16"},
        {"slot_name": "slot_17" , "slot_value": "17"},
        {"slot_name": "slot_18" , "slot_value": "18"},
        {"slot_name": "slot_19" , "slot_value": "19"},
        {"slot_name": "slot_20" , "slot_value": "20"},
        {"slot_name": "slot_21" , "slot_value": "21"},
        {"slot_name": "slot_22" , "slot_value": "22"},
        {"slot_name": "slot_23" , "slot_value": "23"},
        {"slot_name": "slot_24" , "slot_value": "24"},
        {"slot_name": "slot_25" , "slot_value": "25"},
        {"slot_name": "slot_26" , "slot_value": "26"},
        {"slot_name": "slot_27" , "slot_value": "27"},
        {"slot_name": "slot_28" , "slot_value": "28"},
        {"slot_name": "slot_29" , "slot_value": "29"},
        {"slot_name": "slot_30" , "slot_value": "30"},
        {"slot_name": "slot_31" , "slot_value": "31"},
        {"slot_name": "slot_32" , "slot_value": "32"},
        {"slot_name": "slot_33" , "slot_value": "33"},
        {"slot_name": "slot_34" , "slot_value": "34"},
        {"slot_name": "slot_35" , "slot_value": "35"},
        {"slot_name": "slot_36" , "slot_value": "36"},
        {"slot_name": "slot_2to1_1" , "slot_value": "2to1_1"},
        {"slot_name": "slot_2to1_2" , "slot_value": "2to1_2"},
        {"slot_name": "slot_2to1_3" , "slot_value": "2to1_3"},
        {"slot_name": "slot_1_12" , "slot_value": "1st12"},
        {"slot_name": "slot_2_12" , "slot_value": "2nd12"},
        {"slot_name": "slot_3_12" , "slot_value": "3rd12"},
        {"slot_name": "slot_1_to_18" , "slot_value": "1to18"},
        {"slot_name": "slot_19_to_36" , "slot_value": "19to36"},
        {"slot_name": "slot_even" , "slot_value": "even"},
        {"slot_name": "slot_odd" , "slot_value": "odd"},
        {"slot_name": "slot_red" , "slot_value": "red"},
        {"slot_name": "slot_black" , "slot_value": "black"},
    ];

    for(var i = 0; i < bet_input.length ; i++){
        for(var j = 0 ; j < slotName_to_value.length ; j++){
            if(bet_input[i] === slotName_to_value[j].slot_name){
                final_bet_array.push(slotName_to_value[j].slot_value);
                break;
            }
        }
    }

    console.log(final_bet_array);
    return true;
}

var roulletPreloadGame = function() {
    console.log("Loading roullet game");
};

roulletPreloadGame.prototype = {
    preload: function() {
        loading = game.add.sprite(700, 300, 'loading');
        loading.anchor.setTo(0.5, 0.5);

        game.load.image('wheel', 'assets/sprites/wheel.png');
        game.load.image('selector', 'assets/sprites/selector.png');
        game.load.image('table', 'assets/sprites/table.png');

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

        game.load.image('blue_100', 'assets/sprites/pokerchips/b100.png');
        game.load.image('blue_500', 'assets/sprites/pokerchips/b500.png');
        game.load.image('blue_1000', 'assets/sprites/pokerchips/b1000.png');

        game.load.image('green_100', 'assets/sprites/pokerchips/g100.png');
        game.load.image('green_500', 'assets/sprites/pokerchips/g500.png');
        game.load.image('green_1000', 'assets/sprites/pokerchips/g1000.png');

        game.load.image('grey_100', 'assets/sprites/pokerchips/gr100.png');
        game.load.image('grey_500', 'assets/sprites/pokerchips/gr500.png');
        game.load.image('grey_1000', 'assets/sprites/pokerchips/gr1000.png');

        game.load.image('purple_100', 'assets/sprites/pokerchips/p100.png');
        game.load.image('purple_500', 'assets/sprites/pokerchips/p500.png');
        game.load.image('purple_1000', 'assets/sprites/pokerchips/p1000.png');

        game.load.image('red_100', 'assets/sprites/pokerchips/r100.png');
        game.load.image('red_500', 'assets/sprites/pokerchips/r500.png');
        game.load.image('red_1000', 'assets/sprites/pokerchips/r1000.png');

        game.load.image('pointer', 'assets/sprites/pointer.png');

        game.load.image('chip_selector', 'assets/sprites/chip_selector.png');
        game.load.image('hud_background', 'assets/sprites/hud_background.png');
        game.load.image('bg', 'assets/background.png');
        game.load.spritesheet('startButton', 'assets/spritesheet/startButton.png', 200, 100);
        game.load.spritesheet('quitButton', 'assets/spritesheet/quitButton.png', 125, 100);
        game.load.spritesheet('fullButton', 'assets/spritesheet/fullButton.png', 125, 100);
    },
    create: function() {
        game.state.start('roulletRenderGame');
    }
};

var roulletStartGame = function() {
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

        /*.................Static UI with relative positioning...................*/
        game.add.tileSprite(0, 0, 1366, 768, 'bg');

        quitButton = game.add.button(1300, 10, 'quitButton', quit, this, 2, 1, 0);
        fullButton = game.add.button(1250, 10, 'fullButton', goFull, this, 2, 1, 0);

        quitButton.scale.setTo(quitButton_scale, quitButton_scale);
        fullButton.scale.setTo(fullButton_scale, fullButton_scale);

        table = game.add.sprite(table_x, table_y, 'table');
        table.scale.setTo(table_scale, table_scale);
        table.anchor.setTo(table_anchor_x, table_anchor_y);

        wheel = game.add.sprite(wheel_x, wheel_y, 'wheel');
        wheel.scale.setTo(wheel_scale, wheel_scale);
        wheel.anchor.setTo(wheel_anchor_x, wheel_anchor_y);

        slot_0 = game.add.sprite((number_position_x + (number_scale * number_block_1_resolution_x * 0)), (number_position_y + (number_scale * number_block_1_resolution_y * 0)), 'slot_0');
        slot_0.scale.setTo(number_scale, number_scale);
        slot_00 = game.add.sprite((number_position_x + (number_scale * number_block_1_resolution_x * 0)), (number_position_y + (number_scale * number_block_1_resolution_y * 1)), 'slot_00');
        slot_00.scale.setTo(number_scale, number_scale);

        slot_1 = game.add.sprite((number_position_x + (number_scale * number_block_1_resolution_x * 1)), (number_position_y + (number_scale * number_block_2_resolution_y * 2)), 'slot_1');
        slot_1.scale.setTo(number_scale, number_scale);
        slot_2 = game.add.sprite((number_position_x + (number_scale * number_block_1_resolution_x * 1)), (number_position_y + (number_scale * number_block_2_resolution_y * 1)), 'slot_2');
        slot_2.scale.setTo(number_scale, number_scale);
        slot_3 = game.add.sprite((number_position_x + (number_scale * number_block_1_resolution_x * 1)), (number_position_y + (number_scale * number_block_2_resolution_y * 0)), 'slot_3');
        slot_3.scale.setTo(number_scale, number_scale);

        slot_4 = game.add.sprite((number_position_x + (number_scale * number_block_1_resolution_x * 1) + (number_scale * number_block_2_resolution_x * 1)), (number_position_y + (number_scale * number_block_1_resolution_y * 0) + (number_scale * number_block_2_resolution_y * 2)), 'slot_4');
        slot_4.scale.setTo(number_scale, number_scale);
        slot_5 = game.add.sprite((number_position_x + (number_scale * number_block_1_resolution_x * 1) + (number_scale * number_block_2_resolution_x * 1)), (number_position_y + (number_scale * number_block_1_resolution_y * 0) + (number_scale * number_block_2_resolution_y * 1)), 'slot_5');
        slot_5.scale.setTo(number_scale, number_scale);
        slot_6 = game.add.sprite((number_position_x + (number_scale * number_block_1_resolution_x * 1) + (number_scale * number_block_2_resolution_x * 1)), (number_position_y + (number_scale * number_block_1_resolution_y * 0) + (number_scale * number_block_2_resolution_y * 0)), 'slot_6');
        slot_6.scale.setTo(number_scale, number_scale);

        slot_7 = game.add.sprite((number_position_x + (number_scale * number_block_1_resolution_x * 1) + (number_scale * number_block_2_resolution_x * 2)), (number_position_y + (number_scale * number_block_1_resolution_y * 0) + (number_scale * number_block_2_resolution_y * 2)), 'slot_7');
        slot_7.scale.setTo(number_scale, number_scale);
        slot_8 = game.add.sprite((number_position_x + (number_scale * number_block_1_resolution_x * 1) + (number_scale * number_block_2_resolution_x * 2)), (number_position_y + (number_scale * number_block_1_resolution_y * 0) + (number_scale * number_block_2_resolution_y * 1)), 'slot_8');
        slot_8.scale.setTo(number_scale, number_scale);
        slot_9 = game.add.sprite((number_position_x + (number_scale * number_block_1_resolution_x * 1) + (number_scale * number_block_2_resolution_x * 2)), (number_position_y + (number_scale * number_block_1_resolution_y * 0) + (number_scale * number_block_2_resolution_y * 0)), 'slot_9');
        slot_9.scale.setTo(number_scale, number_scale);

        slot_10 = game.add.sprite((number_position_x + (number_scale * number_block_1_resolution_x * 1) + (number_scale * number_block_2_resolution_x * 3)), (number_position_y + (number_scale * number_block_1_resolution_y * 0) + (number_scale * number_block_2_resolution_y * 2)), 'slot_10');
        slot_10.scale.setTo(number_scale, number_scale);
        slot_11 = game.add.sprite((number_position_x + (number_scale * number_block_1_resolution_x * 1) + (number_scale * number_block_2_resolution_x * 3)), (number_position_y + (number_scale * number_block_1_resolution_y * 0) + (number_scale * number_block_2_resolution_y * 1)), 'slot_11');
        slot_11.scale.setTo(number_scale, number_scale);
        slot_12 = game.add.sprite((number_position_x + (number_scale * number_block_1_resolution_x * 1) + (number_scale * number_block_2_resolution_x * 3)), (number_position_y + (number_scale * number_block_1_resolution_y * 0) + (number_scale * number_block_2_resolution_y * 0)), 'slot_12');
        slot_12.scale.setTo(number_scale, number_scale);

        slot_13 = game.add.sprite((number_position_x + (number_scale * number_block_1_resolution_x * 1) + (number_scale * number_block_2_resolution_x * 4)), (number_position_y + (number_scale * number_block_1_resolution_y * 0) + (number_scale * number_block_2_resolution_y * 2)), 'slot_13');
        slot_13.scale.setTo(number_scale, number_scale);
        slot_14 = game.add.sprite((number_position_x + (number_scale * number_block_1_resolution_x * 1) + (number_scale * number_block_2_resolution_x * 4)), (number_position_y + (number_scale * number_block_1_resolution_y * 0) + (number_scale * number_block_2_resolution_y * 1)), 'slot_14');
        slot_14.scale.setTo(number_scale, number_scale);
        slot_15 = game.add.sprite((number_position_x + (number_scale * number_block_1_resolution_x * 1) + (number_scale * number_block_2_resolution_x * 4)), (number_position_y + (number_scale * number_block_1_resolution_y * 0) + (number_scale * number_block_2_resolution_y * 0)), 'slot_15');
        slot_15.scale.setTo(number_scale, number_scale);

        slot_16 = game.add.sprite((number_position_x + (number_scale * number_block_1_resolution_x * 1) + (number_scale * number_block_2_resolution_x * 5)), (number_position_y + (number_scale * number_block_1_resolution_y * 0) + (number_scale * number_block_2_resolution_y * 2)), 'slot_16');
        slot_16.scale.setTo(number_scale, number_scale);
        slot_17 = game.add.sprite((number_position_x + (number_scale * number_block_1_resolution_x * 1) + (number_scale * number_block_2_resolution_x * 5)), (number_position_y + (number_scale * number_block_1_resolution_y * 0) + (number_scale * number_block_2_resolution_y * 1)), 'slot_17');
        slot_17.scale.setTo(number_scale, number_scale);
        slot_18 = game.add.sprite((number_position_x + (number_scale * number_block_1_resolution_x * 1) + (number_scale * number_block_2_resolution_x * 5)), (number_position_y + (number_scale * number_block_1_resolution_y * 0) + (number_scale * number_block_2_resolution_y * 0)), 'slot_18');
        slot_18.scale.setTo(number_scale, number_scale);

        slot_19 = game.add.sprite((number_position_x + (number_scale * number_block_1_resolution_x * 1) + (number_scale * number_block_2_resolution_x * 6)), (number_position_y + (number_scale * number_block_1_resolution_y * 0) + (number_scale * number_block_2_resolution_y * 2)), 'slot_19');
        slot_19.scale.setTo(number_scale, number_scale);
        slot_20 = game.add.sprite((number_position_x + (number_scale * number_block_1_resolution_x * 1) + (number_scale * number_block_2_resolution_x * 6)), (number_position_y + (number_scale * number_block_1_resolution_y * 0) + (number_scale * number_block_2_resolution_y * 1)), 'slot_20');
        slot_20.scale.setTo(number_scale, number_scale);
        slot_21 = game.add.sprite((number_position_x + (number_scale * number_block_1_resolution_x * 1) + (number_scale * number_block_2_resolution_x * 6)), (number_position_y + (number_scale * number_block_1_resolution_y * 0) + (number_scale * number_block_2_resolution_y * 0)), 'slot_21');
        slot_21.scale.setTo(number_scale, number_scale);

        slot_22 = game.add.sprite((number_position_x + (number_scale * number_block_1_resolution_x * 1) + (number_scale * number_block_2_resolution_x * 7)), (number_position_y + (number_scale * number_block_1_resolution_y * 0) + (number_scale * number_block_2_resolution_y * 2)), 'slot_22');
        slot_22.scale.setTo(number_scale, number_scale);
        slot_23 = game.add.sprite((number_position_x + (number_scale * number_block_1_resolution_x * 1) + (number_scale * number_block_2_resolution_x * 7)), (number_position_y + (number_scale * number_block_1_resolution_y * 0) + (number_scale * number_block_2_resolution_y * 1)), 'slot_23');
        slot_23.scale.setTo(number_scale, number_scale);
        slot_24 = game.add.sprite((number_position_x + (number_scale * number_block_1_resolution_x * 1) + (number_scale * number_block_2_resolution_x * 7)), (number_position_y + (number_scale * number_block_1_resolution_y * 0) + (number_scale * number_block_2_resolution_y * 0)), 'slot_24');
        slot_24.scale.setTo(number_scale, number_scale);

        slot_25 = game.add.sprite((number_position_x + (number_scale * number_block_1_resolution_x * 1) + (number_scale * number_block_2_resolution_x * 8)), (number_position_y + (number_scale * number_block_1_resolution_y * 0) + (number_scale * number_block_2_resolution_y * 2)), 'slot_25');
        slot_25.scale.setTo(number_scale, number_scale);
        slot_26 = game.add.sprite((number_position_x + (number_scale * number_block_1_resolution_x * 1) + (number_scale * number_block_2_resolution_x * 8)), (number_position_y + (number_scale * number_block_1_resolution_y * 0) + (number_scale * number_block_2_resolution_y * 1)), 'slot_26');
        slot_26.scale.setTo(number_scale, number_scale);
        slot_27 = game.add.sprite((number_position_x + (number_scale * number_block_1_resolution_x * 1) + (number_scale * number_block_2_resolution_x * 8)), (number_position_y + (number_scale * number_block_1_resolution_y * 0) + (number_scale * number_block_2_resolution_y * 0)), 'slot_27');
        slot_27.scale.setTo(number_scale, number_scale);

        slot_28 = game.add.sprite((number_position_x + (number_scale * number_block_1_resolution_x * 1) + (number_scale * number_block_2_resolution_x * 9)), (number_position_y + (number_scale * number_block_1_resolution_y * 0) + (number_scale * number_block_2_resolution_y * 2)), 'slot_28');
        slot_28.scale.setTo(number_scale, number_scale);
        slot_29 = game.add.sprite((number_position_x + (number_scale * number_block_1_resolution_x * 1) + (number_scale * number_block_2_resolution_x * 9)), (number_position_y + (number_scale * number_block_1_resolution_y * 0) + (number_scale * number_block_2_resolution_y * 1)), 'slot_29');
        slot_29.scale.setTo(number_scale, number_scale);
        slot_30 = game.add.sprite((number_position_x + (number_scale * number_block_1_resolution_x * 1) + (number_scale * number_block_2_resolution_x * 9)), (number_position_y + (number_scale * number_block_1_resolution_y * 0) + (number_scale * number_block_2_resolution_y * 0)), 'slot_30');
        slot_30.scale.setTo(number_scale, number_scale);

        slot_31 = game.add.sprite((number_position_x + (number_scale * number_block_1_resolution_x * 1) + (number_scale * number_block_2_resolution_x * 10)), (number_position_y + (number_scale * number_block_1_resolution_y * 0) + (number_scale * number_block_2_resolution_y * 2)), 'slot_31');
        slot_31.scale.setTo(number_scale, number_scale);
        slot_32 = game.add.sprite((number_position_x + (number_scale * number_block_1_resolution_x * 1) + (number_scale * number_block_2_resolution_x * 10)), (number_position_y + (number_scale * number_block_1_resolution_y * 0) + (number_scale * number_block_2_resolution_y * 1)), 'slot_32');
        slot_32.scale.setTo(number_scale, number_scale);
        slot_33 = game.add.sprite((number_position_x + (number_scale * number_block_1_resolution_x * 1) + (number_scale * number_block_2_resolution_x * 10)), (number_position_y + (number_scale * number_block_1_resolution_y * 0) + (number_scale * number_block_2_resolution_y * 0)), 'slot_33');
        slot_33.scale.setTo(number_scale, number_scale);

        slot_34 = game.add.sprite((number_position_x + (number_scale * number_block_1_resolution_x * 1) + (number_scale * number_block_2_resolution_x * 11)), (number_position_y + (number_scale * number_block_1_resolution_y * 0) + (number_scale * number_block_2_resolution_y * 2)), 'slot_34');
        slot_34.scale.setTo(number_scale, number_scale);
        slot_35 = game.add.sprite((number_position_x + (number_scale * number_block_1_resolution_x * 1) + (number_scale * number_block_2_resolution_x * 11)), (number_position_y + (number_scale * number_block_1_resolution_y * 0) + (number_scale * number_block_2_resolution_y * 1)), 'slot_35');
        slot_35.scale.setTo(number_scale, number_scale);
        slot_36 = game.add.sprite((number_position_x + (number_scale * number_block_1_resolution_x * 1) + (number_scale * number_block_2_resolution_x * 11)), (number_position_y + (number_scale * number_block_1_resolution_y * 0) + (number_scale * number_block_2_resolution_y * 0)), 'slot_36');
        slot_36.scale.setTo(number_scale, number_scale);

        slot_2to1_1 = game.add.sprite((number_position_x + (number_scale * number_block_1_resolution_x * 1) + (number_scale * number_block_2_resolution_x * 12)), (number_position_y + (number_scale * number_block_1_resolution_y * 0) + (number_scale * number_block_2_resolution_y * 2)), 'slot_2to1_1');
        slot_2to1_1.scale.setTo(number_scale, number_scale);
        slot_2to1_2 = game.add.sprite((number_position_x + (number_scale * number_block_1_resolution_x * 1) + (number_scale * number_block_2_resolution_x * 12)), (number_position_y + (number_scale * number_block_1_resolution_y * 0) + (number_scale * number_block_2_resolution_y * 1)), 'slot_2to1_2');
        slot_2to1_2.scale.setTo(number_scale, number_scale);
        slot_2to1_3 = game.add.sprite((number_position_x + (number_scale * number_block_1_resolution_x * 1) + (number_scale * number_block_2_resolution_x * 12)), (number_position_y + (number_scale * number_block_1_resolution_y * 0) + (number_scale * number_block_2_resolution_y * 0)), 'slot_2to1_3');
        slot_2to1_3.scale.setTo(number_scale, number_scale);

        slot_1_12 = game.add.sprite((number_position_x + (number_scale * number_block_1_resolution_x * 1) + (number_scale * number_block_3_resolution_x * 0)), (number_position_y + (number_scale * number_block_1_resolution_y * 0) + (number_scale * number_block_2_resolution_y * 3)), 'slot_1-12');
        slot_1_12.scale.setTo(number_scale, number_scale);
        slot_2_12 = game.add.sprite((number_position_x + (number_scale * number_block_1_resolution_x * 1) + (number_scale * number_block_3_resolution_x * 1)), (number_position_y + (number_scale * number_block_1_resolution_y * 0) + (number_scale * number_block_2_resolution_y * 3)), 'slot_2-12');
        slot_2_12.scale.setTo(number_scale, number_scale);
        slot_3_12 = game.add.sprite((number_position_x + (number_scale * number_block_1_resolution_x * 1) + (number_scale * number_block_3_resolution_x * 2)), (number_position_y + (number_scale * number_block_1_resolution_y * 0) + (number_scale * number_block_2_resolution_y * 3)), 'slot_3-12');
        slot_3_12.scale.setTo(number_scale, number_scale);

        slot_1_to_18 = game.add.sprite((number_position_x + (number_scale * number_block_1_resolution_x * 1) + (number_scale * number_block_4_resolution_x * 0)), (number_position_y + (number_scale * number_block_1_resolution_y * 0) + (number_scale * number_block_2_resolution_y * 3) + (number_scale * number_block_3_resolution_y * 1)), 'slot_1-18');
        slot_1_to_18.scale.setTo(number_scale, number_scale);
        slot_even = game.add.sprite((number_position_x + (number_scale * number_block_1_resolution_x * 1) + (number_scale * number_block_4_resolution_x * 1)), (number_position_y + (number_scale * number_block_1_resolution_y * 0) + (number_scale * number_block_2_resolution_y * 3) + (number_scale * number_block_3_resolution_y * 1)), 'slot_even');
        slot_even.scale.setTo(number_scale, number_scale);
        slot_red = game.add.sprite((number_position_x + (number_scale * number_block_1_resolution_x * 1) + (number_scale * number_block_4_resolution_x * 2)), (number_position_y + (number_scale * number_block_1_resolution_y * 0) + (number_scale * number_block_2_resolution_y * 3) + (number_scale * number_block_3_resolution_y * 1)), 'slot_red');
        slot_red.scale.setTo(number_scale, number_scale);
        slot_black = game.add.sprite((number_position_x + (number_scale * number_block_1_resolution_x * 1) + (number_scale * number_block_4_resolution_x * 3)), (number_position_y + (number_scale * number_block_1_resolution_y * 0) + (number_scale * number_block_2_resolution_y * 3) + (number_scale * number_block_3_resolution_y * 1)), 'slot_black');
        slot_black.scale.setTo(number_scale, number_scale);
        slot_odd = game.add.sprite((number_position_x + (number_scale * number_block_1_resolution_x * 1) + (number_scale * number_block_4_resolution_x * 4)), (number_position_y + (number_scale * number_block_1_resolution_y * 0) + (number_scale * number_block_2_resolution_y * 3) + (number_scale * number_block_3_resolution_y * 1)), 'slot_odd');
        slot_odd.scale.setTo(number_scale, number_scale);
        slot_19_to_36 = game.add.sprite((number_position_x + (number_scale * number_block_1_resolution_x * 1) + (number_scale * number_block_4_resolution_x * 5)), (number_position_y + (number_scale * number_block_1_resolution_y * 0) + (number_scale * number_block_2_resolution_y * 3) + (number_scale * number_block_3_resolution_y * 1)), 'slot_19-36');
        slot_19_to_36.scale.setTo(number_scale, number_scale);

        /* Game Input Mechanism */
        pointer = new Phaser.Rectangle(0, 0, 25, 25);

        normal_slots = game.add.group();
        normal_slots.inputEnableChildren = true;
        normal_slots.addMultiple([slot_1, slot_2, slot_3, slot_4, slot_5, slot_6, slot_7, slot_8, slot_9, slot_10, slot_11, slot_12, slot_12, slot_13, slot_14, slot_15, slot_16, slot_17, slot_18, slot_19, slot_20, slot_21, slot_22, slot_23, slot_24, slot_25, slot_26, slot_27, slot_28, slot_29, slot_30, slot_31, slot_32, slot_33, slot_34, slot_35, slot_36]);

        special_slots = game.add.group();
        special_slots.inputEnableChildren = true;
        special_slots.addMultiple([slot_0, slot_00, slot_2to1_1, slot_2to1_2, slot_2to1_3, slot_1_12, slot_2_12, slot_3_12, slot_1_to_18, slot_19_to_36, slot_odd, slot_even, slot_red, slot_black]);

        hud_background = game.add.sprite(0, game.world.centerY+220, 'hud_background');
        hud_background.scale.setTo(1, 0.8);
        hud_background.alpha = 0.7;

        pokerchip_100 = game.add.sprite(game.world.centerX-300, game.world.centerY+300, 'blue_100');
        pokerchip_100.scale.setTo(0.15, 0.15);
        pokerchip_100.anchor.setTo(0.5,0.5);

        pokerchip_500 = game.add.sprite(game.world.centerX-150, game.world.centerY+300, 'blue_500');
        pokerchip_500.scale.setTo(0.15, 0.15);
        pokerchip_500.anchor.setTo(0.5,0.5);

        pokerchip_1000 = game.add.sprite(game.world.centerX, game.world.centerY+300, 'blue_1000');
        pokerchip_1000.scale.setTo(0.15, 0.15);
        pokerchip_1000.anchor.setTo(0.5,0.5);

        input_poker_chip_group = game.add.group();
        input_poker_chip_group.inputEnableChildren = true;
        input_poker_chip_group.addMultiple([pokerchip_100, pokerchip_500, pokerchip_1000]);
    },

    update: function() {

        /* check game input every frame */
        normal_slots.onChildInputOver.add(function() {
            normal_input_mode = true;
        }, this);
        normal_slots.onChildInputOut.add(function() {
            normal_input_mode = false;
        }, this);

        if (normal_input_mode) {
            pointer.x = game.input.mousePointer.x - 20;
            pointer.y = game.input.mousePointer.y - 20;
        } else {
            pointer.x = 0;
            pointer.y = 0;
        }

        normal_slots.forEach(function(item) {
            if (checkOverlap(item, pointer)) {
                item.alpha = 0.5
                if (game.input.activePointer.leftButton.isDown) {
                    if ($.inArray(item.key, bet_input) === -1) {
                        bet_input.push(item.key);
                    }
                }
                if (game.input.activePointer.leftButton.isUp && bet_input.length > 0) {
                    if (place_bet(bet_input)) {
                        bet_input = [];
                    }
                }
            } else {
                item.alpha = 1;
            }
        });

        special_slots.onChildInputOver.add(function (sprite) {
            sprite.alpha = 0.5;
        }, this);
        special_slots.onChildInputOut.add(function (sprite) {
            sprite.alpha = 1;
        }, this);
        special_slots.onChildInputDown.add(function (sprite) {
            bet_input = [];
            bet_input.push(sprite.key);
            if(place_bet(bet_input)){
                bet_input = [];
            }
        }, this);

        /* poker chip input */
        input_poker_chip_group.onChildInputOver.add(function (sprite) {
            sprite.alpha = 0.5;
        }, this);
        input_poker_chip_group.onChildInputOut.add(function (sprite) {
            sprite.alpha = 1;
        }, this);
        input_poker_chip_group.onChildInputDown.add(function (sprite){
            var chip = sprite.key;
            var chip_value = null;
            console.log(chip)
            if(chip === 'blue_100'){
                chip_value = 100;
            }
            else if(chip === 'blue_500'){
                chip_value = 500;
            }
            else if(chip === 'blue_1000'){
                chip_value = 1000;
            }
            if(selected_chip_value !== null){
                chip_select.removeSelector();
            }
            chip_select = new CHIP_SELECTOR(game, chip_value);
            chip_select.createSelector();
            selected_chip_value = chip_value;
        }, this);

    },

    render: function() {
        game.debug.inputInfo(32, 32);
    }
};

game.state.add('bootState', bootState);
game.state.add('roulletPreloadGame', roulletPreloadGame);
game.state.add('roulletStartGame', roulletStartGame);
game.state.add('roulletRenderGame', roulletRenderGame);

game.state.start('bootState');


/*
    //bootState

    //GET gameid, playerid
    var playinfo = function (playerid, gameid){
        return jsonobject; // playerid, lobbyid, cashbalance
    }

    // var playerinfo = function (lobbyid){
        return playerinfo;
    }
    // timeout
    var isRoundOver = function (lobbyid){
        return false;
        // timeout return true;
    }
    if(isRoundOver){
        input = false;
        var number = function getRn(lobbyid , bets){
            return int;son // playerid , newcashbalance
        }
        var other_player_bets = function (lobbyid){
            return array; // totolbets
        }
    }

    // wheel animation start 
    var isBetSend = function (lobbyid , bets){
        return true;
    }
    (isBetSend && isWheelanimationfinished){
        function roundover(lobbyid){

        }
    }
*/