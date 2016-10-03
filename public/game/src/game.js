/* global Phaser */

/* jquery node module */
//var $ = require('jquery');

/* phaser node module */
// window.PIXI = require('phaser/build/custom/pixi');
// window.p2 = require('phaser/build/custom/p2');
// window.Phaser = require('phaser/build/custom/phaser-split');

/* Backend Functions */
var server_url = 'http://localhost:800/';

function getBets(){
   	ajx=new XMLHttpRequest();
	if(!ajx){
		alert("Internet explorer not supported by this site!!!");
		return;
	}
	if(ajx.readyState==4 || ajx.readyState==0){
		ajx.open("GET",server_url+"getBets",false);
		ajx.send();
		var response;
		response=this.responseText;
		return response;
	}
}

function getPlayers(){
    ajx=new XMLHttpRequest();
    if(!ajx){
        alert("Internet explorer not supported by this site!!!");
        return;
    }
    ajx.open("GET",server_url+"getPlayers",false);
    ajx.send();
    var response;
    response=ajx.responseText;
    return response;
}

function payout(){
    ajx=new XMLHttpRequest();
    if(!ajx){
        alert("Internet explorer not supported by this site!!!");
        return;
    }
    ajx.open("GET",server_url+"payout",false);
    ajx.send();
    var response;
    response=ajx.responseText;
    return response;
}

function timer(){
    ajx=new XMLHttpRequest();
    if(!ajx){
        alert("Internet explorer not supported by this site!!!");
        return;
    }
    ajx.open("GET",server_url+"timer",false);
    ajx.send();
    var response;
    response=ajx.responseText;
    var num=parseInt(response,10);
    return num;
}

function initGame(game_id){
	ajx=new XMLHttpRequest();
    if(!ajx){
        alert("Internet explorer not supported by this site!!!");
        return;
    }
    if(ajx.readyState==4 || ajx.readyState==0){
        ajx.open("GET",server_url+"/player?game_id="+game_id,true);
        ajx.onreadystatechange=serverResponse;
        ajx.setRequestHeader("Content-type", "application/json");
        console.log(JSON.stringify(obj));
        ajx.send(JSON.stringify(obj));
    }
    function serverResponse(){
        var response;
        if(ajx.readyState==4 && ajx.status==200){
            response=this.responseText;
            if(response.search(/not logged in/i)!=-1){
                document.getElementById("out").innerHTML=response;
            }else{
                //call your function here
            }
        }
    }
}

function getBingoNumber(){
	ajx=new XMLHttpRequest();
    if(!ajx){
        alert("Internet explorer not supported by this site!!!");
        return;
    }
    ajx.open("GET",server_url+"/getBingoNumber",false);
    ajx.send();
    var response;
    response=ajx.responseText;
    response=response.split(",");
    for(var i=0;i<response.length;i++){
        response[i]=parseInt(response[i],10);
    }
    return response;
}

function bingoReady(){
	ajx=new XMLHttpRequest();
	if(!ajx){
		alert("Internet explorer not supported by this site!!!");
	return;
	}
	ajx.open("GET",server_url+"/bingoReady",false);
	ajx.send();
	var response;
	response=ajx.responseText;
	response=response.split(",");
	for(var i=0;i<response.length;i++){
		response[i]=parseInt(response[i],10);
	}
	return response;
}

function updatePlayer(won , coins, coins_won){
    this.won = won;
    this.coins = coins;
    this.coins_won = coins_won;
    ajx=new XMLHttpRequest();
    if(!ajx){
        alert("Internet explorer not supported by this site!!!");
        return;
    }
    ajx.open("GET",server_url+"updatePlayer?won="+this.won+"&coins="+this.coins+"&coins_won="+this.coins_won,false);
    ajx.send();
    var response;
}

function putBet(bets){
	ajx=new XMLHttpRequest();
	if(!ajx){
		alert("Internet explorer not supported by this site!!!");
		return;
	}
	ajx.open("POST",site+"putBet",false);
	ajx.setRequestHeader("Content-type", "application/json");
	console.log(confirmBet());
	ajx.send(confirmBet());
	return ajx.responseText;
}

function getPlayer(game_id){
	ajx=new XMLHttpRequest();
	if(!ajx){
		alert("Internet explorer not supported by this site!!!");
		return;
	}
	ajx.open("GET",server_url+"/player?game_id="+game_id,false);
	ajx.send();
	var response;
	//response=JSON.parse(this.responseText);
	response=ajx.responseText;
	return response;
	//do whatever you want with response
}

$.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	return results[1] || 0;
};
var gameid = parseInt($.urlParam('gameid'));
var username = getPlayer();
var color;
var cashbalance;

/* {username:"mit17k",coins:"10000",color:"red"} */
//var players_list = JSON.parse(getPlayers());

var playersInfo = JSON.parse(getPlayers());
for(var i = 0 ; i < playersInfo.length ; i++){
    if(username === playersInfo[i].username){
        color = playersInfo[i].color;
        cashbalance = playersInfo[i].cashbalance;
        break;
    }
}
if(color === null && cashbalance === null){
    console.log('DATABASE ERROR! NO USER INFO FOUND');
}

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
    alert('Game Over');
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
        
        if(gameid === 1){
            game.state.start('roulletPreloadGame');
        }
        else if (gameid === 2){
            game.state.start('bingoPreloadGame');
        }
        else if (gameid === 3){
            game.state.start('slotsPreloadGame');
        }
        else{
            console.log('Invalid GameID');
        }
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
var removebets;

var fullButton_scale = 0.3;
var quitButton_scale = 0.3;
var removebets_scale = 0.4;

var removebets_x = (1366/2)-490;
var removebets_y = (768/2)+325;

/* sprite groups */
var normal_slots;
var special_slots;
var input_poker_chip_group;

/* HUD */
var hud_background;

var pokerchip_100;
var pokerchip_500;
var pokerchip_1000;

var main_user_avatar = null;
var main_user_avatar_x = (1366/2)-600;
var main_user_avatar_y = (768/2)+280;
var main_user_avatar_scale = 0.15;
var main_user_avatar_anchor_x = 0.5;
var main_user_avatar_anchor_y = 0.5;

var main_user_name;
var main_user_name_x = (1366/2)-660;
var main_user_name_y = (768/2)+320;

var credit_balance;
var credit_balance_x = (1366/2)-490;
var credit_balance_y = (768/2)+240;

var current_bets_credits;
var current_bets_credits_x = (1366/2)-490;
var current_bets_credits_y = (768/2)+280;

var other_players_grp;
var other_players_names;
var other_players_balance;
var select_num = null;

/* input */
var selected_chip_value = null;
var chip_select;
var pointer;
var bet_limiter = true;
var normal_input_mode = false;
var bet_input = [];
var final_bets_json_object = [];
var final_bet_json_string = null;
var input_roulette = false;
var temp_new_user_info;
var callcounter = false;

/* poker chip render */
var chip_group = [];

/* game mechanics */
var isTimout = false;
var isInputEnable = true;
var current_bets_value = 0;
var nullBets = 0;

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

SELECTOR.prototype.removeSelector = function () {
    this.selector_sprite.destroy();
};

POKER_CHIP = function (game, color, slot_info, chip_value, isRandom) {
    this.game = game;
    this.color = color;
    this.slot_info = slot_info;
    this.no_of_chips = this.slot_info.length;
    this.chip_value = chip_value;
    this.isRandom = isRandom;
    this.sprite_group = null;
    this.sprite_index = null;
    this.poker_chip_x = null;
    this.poker_chip_y = null;
    this.poker_chip = null;
    this.poker_chip_scale = 0.059;

    if(!isRandom){
        this.poker_chip_anchor_x = 0.5;
        this.poker_chip_anchor_y = 0.5;
    }
    else{
        this.poker_chip_anchor_x = randomIntFromInterval(1, 10) / 10;
        this.poker_chip_anchor_y = randomIntFromInterval(1, 10) / 10;
    }
    //console.log("x = "+this.poker_chip_anchor_x+" y = "+this.poker_chip_anchor_y);
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

POKER_CHIP.prototype.destroyChip = function () {
    this.poker_chip.destroy();
};

CHIP_SELECTOR = function (game, chip_value){
    this.game = game;
    this.chip_value = chip_value;
};

CHIP_SELECTOR.prototype.createSelector = function (){
    this.chip_selector_x = 0;
    this.chip_selector_y = 0;

    if(this.chip_value === 100){
        this.chip_selector_x = game.world.centerX-175;
        this.chip_selector_y = game.world.centerY+300;
    }
    else if(this.chip_value === 500){
        this.chip_selector_x = game.world.centerX-75;
        this.chip_selector_y = game.world.centerY+300;
    }
    else if(this.chip_value === 1000){
        this.chip_selector_x = game.world.centerX+25;
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
};

CHIP_SELECTOR.prototype.removeSelector = function (){
    this.chip_selector.destroy();
};

var other_players_positions =  [{"x": 750}, {"x": 850}, {"x": 950}, {"x": 1050}];
OTHER_PLAYER = function (index){
    
    this.index = index;

    this.position_x = other_players_positions[this.index].x;

    this.player = game.add.sprite(main_user_avatar_x+this.position_x, main_user_avatar_y, 'avatar2');
    this.player.scale.setTo(main_user_avatar_scale, main_user_avatar_scale);
    this.player.anchor.setTo(main_user_avatar_anchor_x, main_user_avatar_anchor_y);

    
    var player_cashbalance = game.add.bitmapText(main_user_name_x+position_x+20, main_user_name_y+25, 'blackrose', player_info.coins, 25);

};
OTHER_PLAYER.prototype.removePlayerAvatar = function (){
    this.player.destroy();
};

OTHER_PLAYER_USERNAME = function (uid, index){
    
    this.uid = uid;
    this.index = index;
    this.position_x = other_players_positions[this.index].x;
    this.player_username = game.add.bitmapText(main_user_name_x+this.position_x+20, main_user_name_y, 'blackrose', this.uid, 25);

};
OTHER_PLAYER_USERNAME.prototype.removePlayerName = function (){
    this.player_username.destroy();
};

OTHER_PLAYER_CASHBALANCE = function (cashbalance, index){
    
    this.cashbalance = cashbalance;
    this.index = index;
    this.position_x = other_players_positions[this.index].x;
    this.player_cashbalance = game.add.bitmapText(main_user_name_x+this.position_x+20, main_user_name_y, 'blackrose', this.cashbalance, 25);

};
OTHER_PLAYER_CASHBALANCE.prototype.removePlayerCashbalance = function (){
    this.player_cashbalance.destroy();
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

function compareArrayEquality (array_1, array_2){
    this.array_1 = array_1;
    this.array_2 = array_2;

    var status = true;

    if(this.array_1.length !== this.array_2.length){
        return false;
    }
    else{
        for(var i = 0 ; i < this.array_1.length ; i++){
            if(this.array_1[i] !== this.array_2[i]){
                status = false;
                break;
            }
        }
        return status;
    }
}

function randomIntFromInterval(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

function updatePlacedBets(){

    for(var i = 0; i < final_bets_json_object.length; i++){
        final_bets_json_object[i].placed[0] = final_bets_json_object[i].th;
        final_bets_json_object[i].placed[1] = final_bets_json_object[i].fi;
        final_bets_json_object[i].placed[2] = final_bets_json_object[i].hu;
    }
    final_bet_json_string = JSON.stringify(final_bets_json_object);
}

function drawBets(bets,color,other){
    this.bets = bets;
    this.color = color;
    this.other = other;
    var json_array = JSON.parse(this.bets);
    var j = 1;
    var placed_bets = [];
    var initializer = 0;

    if(json_array.length > 0){
        for(var i = 0 ; i < json_array.length ; i++){
            this.th = json_array[i].th;
            this.fi = json_array[i].fi;
            this.hu = json_array[i].hu;
            this.slot = json_array[i].slot;
            this.chip_color = json_array[i].color;
            this.placed_th = json_array[i].placed[0];
            this.placed_fi = json_array[i].placed[1];
            this.placed_hu = json_array[i].placed[2];

            if(this.th > 0){
                if(!this.other){
                    for(j = this.placed_th; j < this.th; j++){
                        if(j === 0){
                            chip_group.push(new POKER_CHIP(game, this.chip_color, this.slot, 1000, false));
                        }
                        else{
                            chip_group.push(new POKER_CHIP(game, this.chip_color, this.slot, 1000, true));                    
                        }
                    }
                }
                else{
                    for(j = 0; j < this.th; j++){
                        if(j === 0){
                            chip_group.push(new POKER_CHIP(game, this.chip_color, this.slot, 1000, false));
                        }
                        else{
                            chip_group.push(new POKER_CHIP(game, this.chip_color, this.slot, 1000, true));                    
                        }
                    }
                }
                
            }
            if(this.fi > 0){
                if(!this.other){
                    for(j = this.placed_fi; j < this.fi; j++){
                        if(j === 0){
                            chip_group.push(new POKER_CHIP(game, this.chip_color, this.slot, 500, false));
                        }
                        else{
                            chip_group.push(new POKER_CHIP(game, this.chip_color, this.slot, 500, true));
                        }
                    }
                }
                else{
                    for(j = 1; j < this.fi; j++){
                        if(j === 0){
                            chip_group.push(new POKER_CHIP(game, this.chip_color, this.slot, 500, false));
                        }
                        else{
                            chip_group.push(new POKER_CHIP(game, this.chip_color, this.slot, 500, true));
                        }
                    }
                }
                
            }
            if(this.hu > 0){
                if(!this.other){
                    for(j = this.placed_hu; j < this.hu; j++){
                        if(j === 0){
                            chip_group.push(new POKER_CHIP(game, this.chip_color, this.slot, 100, false));
                        }
                        else{
                            chip_group.push(new POKER_CHIP(game, this.chip_color, this.slot, 100, true));
                        }
                    }
                }
                else{
                    for(j = 1; j < this.hu; j++){
                        if(j === 0){
                            chip_group.push(new POKER_CHIP(game, this.chip_color, this.slot, 100, false));
                        }
                        else{
                            chip_group.push(new POKER_CHIP(game, this.chip_color, this.slot, 100, true));
                        }
                    }
                }
                
            }
        }
        if(!this.other){
            updatePlacedBets();
        }
    }
    else{
        console.log("Unknwon Referernce");

    }
}

function destroyBets(){
    for(var i = 0 ; i < chip_group.length ; i++){
        chip_group[i].destroyChip();
    }
}

function place_bet(bet_input){
    var uid = username;
    var chip_value = selected_chip_value;
    current_bets_value += chip_value;
    var final_bet_array = [];
    var th = 0;
    var fi = 0;
    var hu = 0;
    var isBetPresent = false;
    var presentBetIndex = null;

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
        {"slot_name": "slot_1-12" , "slot_value": "1st12"},
        {"slot_name": "slot_2-12" , "slot_value": "2nd12"},
        {"slot_name": "slot_3-12" , "slot_value": "3rd12"},
        {"slot_name": "slot_1-18" , "slot_value": "1to18"},
        {"slot_name": "slot_19-36" , "slot_value": "19to36"},
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

    if(final_bet_array.length > 4){
        console.log('BET ARRAY SIZE ERROR');
    }

    if(final_bets_json_object.length > 0){
        for(var j = 0 ; j < final_bets_json_object.length ; j++){
            if(compareArrayEquality(final_bets_json_object[j].slot, final_bet_array)){
                isBetPresent = true;
                presentBetIndex = j;
                break;
            }
        }
    }
    if(!isBetPresent || final_bets_json_object.length === 0){
        if(chip_value === 100){
            hu = 1;
        }
        else if(chip_value === 500){
            fi = 1;
        }
        else if (chip_value === 1000){
            th = 1;
        }
        var temp_json = {"username": uid, "th":th, "fi":fi, "hu":hu, "slot": final_bet_array, "color": color, "placed":[0,0,0]};
        final_bets_json_object.push(temp_json);
    }
    if (isBetPresent) {
        if(chip_value === 100){
            final_bets_json_object[presentBetIndex].hu++;
        }
        else if(chip_value === 500){ 
            final_bets_json_object[presentBetIndex].fi++;
        }
        else if (chip_value === 1000){
            final_bets_json_object[presentBetIndex].th++;
        }
        else {
            console.log('chip value not defined');
        }
    }
    final_bet_json_string = JSON.stringify(final_bets_json_object);
    drawBets(final_bet_json_string, 'blue', false);
    console.log(final_bet_json_string);
    return true;
}

function removeAllBets(){
    destroyBets();
    current_bets_value = 0;
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

        game.load.image('chip_selector', 'assets/sprites/chip_selector.png');
        game.load.image('hud_background', 'assets/sprites/hud_background.png');
        game.load.image('bg', 'assets/background.png');

        game.load.image('avatar1', 'assets/sprites/avatars/1.png');
        game.load.image('avatar2', 'assets/sprites/avatars/2.png');
        game.load.image('avatar3', 'assets/sprites/avatars/3.png');
        game.load.image('avatar4', 'assets/sprites/avatars/4.png');
        game.load.image('avatar5', 'assets/sprites/avatars/5.png');

        game.load.spritesheet('startButton', 'assets/spritesheet/startButton.png', 200, 100);
        game.load.spritesheet('quitButton', 'assets/spritesheet/quitButton.png', 125, 100);
        game.load.spritesheet('fullButton', 'assets/spritesheet/fullButton.png', 125, 100);
        game.load.spritesheet('removebets', 'assets/spritesheet/removebets.png', 300, 100);
        
        game.load.bitmapFont('blackrose', 'assets/bitmapFonts/blackrose/blackrose.png', 'assets/bitmapFonts/blackrose/blackrose.fnt');
        

    },
    create: function() {
        game.state.start('roulletStartGame');
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

        pokerchip_100 = game.add.sprite(game.world.centerX-175, game.world.centerY+300, 'blue_100');
        pokerchip_100.scale.setTo(0.15, 0.15);
        pokerchip_100.anchor.setTo(0.5,0.5);

        pokerchip_500 = game.add.sprite(game.world.centerX-75, game.world.centerY+300, 'blue_500');
        pokerchip_500.scale.setTo(0.15, 0.15);
        pokerchip_500.anchor.setTo(0.5,0.5);

        pokerchip_1000 = game.add.sprite(game.world.centerX+25, game.world.centerY+300, 'blue_1000');
        pokerchip_1000.scale.setTo(0.15, 0.15);
        pokerchip_1000.anchor.setTo(0.5,0.5);

        input_poker_chip_group = game.add.group();
        input_poker_chip_group.inputEnableChildren = true;
        input_poker_chip_group.addMultiple([pokerchip_100, pokerchip_500, pokerchip_1000]);
        
        chip_select = new CHIP_SELECTOR(game, 100);
        chip_select.createSelector();
        selected_chip_value = 100;

        if(color === "blue"){
            main_user_avatar = game.add.sprite(main_user_avatar_x, main_user_avatar_y, 'avatar1');
        }
        else if(color === "green"){
            main_user_avatar = game.add.sprite(main_user_avatar_x, main_user_avatar_y, 'avatar2');
        }
        else if(color === "grey"){
            main_user_avatar = game.add.sprite(main_user_avatar_x, main_user_avatar_y, 'avatar3');
        }
        else if(color === "purple"){
            main_user_avatar = game.add.sprite(main_user_avatar_x, main_user_avatar_y, 'avatar4');
        }
        else if(color === "red"){
            main_user_avatar = game.add.sprite(main_user_avatar_x, main_user_avatar_y, 'avatar5');
        }
        
        main_user_avatar.scale.setTo(main_user_avatar_scale, main_user_avatar_scale);
        main_user_avatar.anchor.setTo(main_user_avatar_anchor_x, main_user_avatar_anchor_y);
        
        main_user_name = game.add.bitmapText(main_user_name_x, main_user_name_y, 'blackrose', username, 50);
        
        credit_balance = game.add.bitmapText(credit_balance_x, credit_balance_y, 'blackrose', 'Balance:'+cashbalance, 40);
        current_bets_credits = game.add.bitmapText(current_bets_credits_x, current_bets_credits_y, 'blackrose', 'Bets:'+current_bets_value, 40);
        
        removebets = game.add.button(removebets_x, removebets_y, 'removebets', removeAllBets, this, 2, 1, 0);
        removebets.scale.setTo(removebets_scale, removebets_scale);

        if(playersInfo.length > 1){
            for(var i = 0 ; i < playersInfo.length ; i++){
                if(username !== playersInfo[i].username){
                    other_players_grp.push(new OTHER_PLAYER(i));
                    other_players_names.push(new OTHER_PLAYER_USERNAME(playersInfo[i].username, i));
                    other_players_balance.push(new OTHER_PLAYER_CASHBALANCE(playersInfo[i].coins, i));
                }
            }
        }
        else if(playersInfo.length > 5){
            console.log('ERROR! UNKNOWN PLAYER');
        }
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
                    if(selected_chip_value + current_bets_value <= cashbalance && input_roulett){
                        if ($.inArray(item.key, bet_input) === -1) {
                            bet_input.push(item.key); 
                        }
                    }
                }
                if (game.input.activePointer.leftButton.isUp && bet_input.length > 0) {
                    if (place_bet(bet_input)) {
                        bet_input = [];
                    }
                }
                if(!isInputEnable){
                    bet_input = [];
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
            if(bet_limiter && (selected_chip_value + current_bets_value <= cashbalance) && input_roulett){
                bet_limiter = false;
                bet_input = [];
                bet_input.push(sprite.key);
                if(place_bet(bet_input)){
                    bet_input = [];
                }
            }
        }, this);
        special_slots.onChildInputUp.add(function (sprite) {
            bet_limiter = true;
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
        
        credit_balance.text = 'Balance:'+cashbalance;
        current_bets_credits.text = 'Bets:'+current_bets_value;

        var new_player_list = JSON.parse(getPlayers());
        if(!compareArrayEquality(new_player_list, playersInfo)){
            for(var i = playersInfo.length-1 ; i < new_player_list.length ; i++){
                other_players_grp.push(new OTHER_PLAYER(i));
                other_players_names.push(new OTHER_PLAYER_USERNAME(new_player_list[i].username, i));
                other_players_balance.push(new OTHER_PLAYER_CASHBALANCE(new_player_list[i].coins, i));
                playersInfo.push(new_player_list[i]);
            }
        }

        /* backend functions */
        var round_time = timer();
        if(round_time === null && callcounter){
            
            input_roulette = false;
            callcounter = false;

            putBets(final_bet_json_string);
            var temp_res = JSON.parse(getBets());

            for (var i = 0 ; i < temp_res.length ; i++){
                if(temp_res[i].username !== username){
                    drawBets(JSON.stringify(temp_res[i]), temp_res[i].color, true);
                }
            }

            var rn = temp_res[0].rn;
            select_num = new SELECTOR(game , rn);
            select_num.play();

            payout();
            temp_new_user_info = JSON.parse(getPlayers());
            for(var i = 0 ; i < temp_new_user_info.length ; i++){
                other_players_balance[i].text = temp_new_user_info[i].coins;
            }
        }
        else {
            if(select_num !== null){
                select_num.removeSelector();
                select_num = null;
            }

            callcounter = true;
            input_roulett = true;
        }
    },

    render: function() {
        //game.debug.inputInfo(32, 32);
    }
};

function startBingo(){
    goFull();
    game.state.start('bingoRenderGame');
}

var bingotitle_button;
var bingotitle_x = (1366/2);
var bingotitle_y = (768/2)-300;
var bingotitle_scale = 0.6;
var bingotitle_anchor_x = 0.5;
var bingotitle_anchor_y = 0.5;

var gridframe;
var gridframe_x = (1366/2)+383;
var gridframe_y = (768/2)+50;
var gridframe_scale = 0.7;
var gridframe_anchor_x = 0.5;
var gridframe_anchor_y = 0.5;

var gridlines;
var gridlines_x = (1366/2)+383;
var gridlines_y = (768/2)+50;
var gridlines_scale = 0.7;
var gridlines_anchor_x = 0.5;
var gridlines_anchor_y = 0.5;

var number_initial_x = (1366/2)+175;
var number_initial_y = (768/2)-150;

var bingo_card_number_group;
var bingo_numbers_history = [];
var bingo_numbers_hist_grp;
var bingo_hist_bg_group;
var strike_grp = [];
var bingo_marked_index = [];

var current_bingo_number_index = 0;
var test_counter = 0;
var glow_current_status = 0;
var current_placement_index = true;
var btn_glow = 0;

STRIKE = function (game, index){
    this.game = game;
    this.index = index;

    var strike_x = bingo_card_number_group.children[this.index].x;
    var strike_y = bingo_card_number_group.children[this.index].y;

    var strike = this.game.add.sprite(strike_x , strike_y, 'strike');
    strike.scale.setTo(0.5, 0.5);
    strike.anchor.setTo(0.5, 0.5);
};

function isInArray (num , array) {
    this.num = num;
    this.array = array;

    var isFound = false;
    for(var i = 0; i < this.array.length ; i++){
        if(this.array[i] === this.num){
            isFound = true;
            break;
        }
    }
    return isFound;
}

function isHistoryNumberPresent() {
    if(bingo_hist_bg_group.length > 0 && bingo_numbers_hist_grp.length > 0){
        return true;
    }
    else{
        return false;
    }
}

function drawHistoryNumbers (){

    var drawPartial = true;
    var counter = 0;

    if(!drawPartial){
        for(var i = 0; i < 5 ; i++){
            for(var j = 0; j < 10 ; j++){
                var hist_num = game.add.sprite(((78/2)+10)*(j+1) + (27.5*j), 200+(100*i), 'numbersstack');
                hist_num.scale.setTo(1, 1);
                hist_num.anchor.setTo(0.5, 0.5);
                bingo_hist_bg_group.add(hist_num);

                var hist_num_text = game.add.bitmapText(((78/2)+8)*(j+1) + (29.5*j), 200+(100*i), 'blackrosegreen',  bingo_numbers_history[counter], 34);
                hist_num_text.anchor.setTo(0.5 , 0.5);
                bingo_numbers_hist_grp.add(hist_num_text);

                counter++;
            }
        }
    }
    else{
        for(var i = 0; i < 5 ; i++){
            for(var j = 0; j < 10 ; j++){
                if(counter === current_bingo_number_index){
                    var hist_num = game.add.sprite(((78/2)+10)*(j+1) + (27.5*j), 200+(100*i), 'numbersstack');
                    hist_num.scale.setTo(1, 1);
                    hist_num.anchor.setTo(0.5, 0.5);
                    bingo_hist_bg_group.add(hist_num);

                    var hist_num_text = game.add.bitmapText(((78/2)+8)*(j+1) + (29.5*j), 200+(100*i), 'blackrosegreen',  bingo_numbers_history[counter], 34);
                    hist_num_text.anchor.setTo(0.5 , 0.5);
                    bingo_numbers_hist_grp.add(hist_num_text);

                }
                counter++;
            }
        }
    }
}

function generateBingoSheetNumbers (){
    var i = 0;
    var bingo_numbers_array = [];
    while(i < 50){
        var random = randomIntFromInterval(1 , 75);
        if(!isInArray(random , bingo_numbers_array)){
            bingo_numbers_array.push(random);
            i++;
        }
    }
    return bingo_numbers_array;
}

function generateBingoSheet (){
    
    var bingo_numbers_array = generateBingoSheetNumbers();
    var counter = 0;
    for(var i = 0 ; i < 5 ; i++){
        for(var j = 0 ; j < 5 ; j++){
            var bingonumber = game.add.bitmapText(number_initial_x + (140 * 0.55 * j) + (13.5 * j * 2) , number_initial_y + (140 * 0.55 * i) + (13.5 * i * 2), 'blackrosegreen', bingo_numbers_array[counter].toString(), 58);
            bingonumber.anchor.setTo(0.5, 0.5);
            bingo_card_number_group.add(bingonumber);
            counter++;
        }
    }
    
}

function getIndex(num, group) {
    this.num = num;
    var temp_index = -1;
    for(var i = 0 ; i < bingo_card_number_group.length ; i++){
        if(bingo_card_number_group.children[i].text === this.num){
            temp_index = i;
            break;
        }
    }
    return temp_index;
}

function isWinCondition (){
    var won = 0;
    if(bingo_marked_index.length > 5){
        if(isInArray(0, bingo_marked_index) && isInArray(1, bingo_marked_index) && isInArray(2, bingo_marked_index) && isInArray(3, bingo_marked_index) && isInArray(4, bingo_marked_index)){
            won++;
        }
        else if(isInArray(5, bingo_marked_index) && isInArray(6, bingo_marked_index) && isInArray(7, bingo_marked_index) && isInArray(8, bingo_marked_index) && isInArray(9, bingo_marked_index)){
            won++;
        }
        else if(isInArray(10, bingo_marked_index) && isInArray(11, bingo_marked_index) && isInArray(12, bingo_marked_index) && isInArray(13, bingo_marked_index) && isInArray(14, bingo_marked_index)){
            won++;
        }
        else if(isInArray(15, bingo_marked_index) && isInArray(16, bingo_marked_index) && isInArray(17, bingo_marked_index) && isInArray(18, bingo_marked_index) && isInArray(19, bingo_marked_index)){
            won++;
        }
        else if(isInArray(20, bingo_marked_index) && isInArray(21, bingo_marked_index) && isInArray(22, bingo_marked_index) && isInArray(23, bingo_marked_index) && isInArray(24, bingo_marked_index)){
            won++;
        }
        else if(isInArray(0, bingo_marked_index) && isInArray(5, bingo_marked_index) && isInArray(10, bingo_marked_index) && isInArray(15, bingo_marked_index) && isInArray(20, bingo_marked_index)){
            won++;
        }
        else if(isInArray(1, bingo_marked_index) && isInArray(6, bingo_marked_index) && isInArray(11, bingo_marked_index) && isInArray(16, bingo_marked_index) && isInArray(21, bingo_marked_index)){
            won = true;
        }
        else if(isInArray(2, bingo_marked_index) && isInArray(7, bingo_marked_index) && isInArray(12, bingo_marked_index) && isInArray(17, bingo_marked_index) && isInArray(22, bingo_marked_index)){
            won++;
        }
        else if(isInArray(3, bingo_marked_index) && isInArray(8, bingo_marked_index) && isInArray(13, bingo_marked_index) && isInArray(18, bingo_marked_index) && isInArray(23, bingo_marked_index)){
            won++;
        }
        else if(isInArray(4, bingo_marked_index) && isInArray(9, bingo_marked_index) && isInArray(14, bingo_marked_index) && isInArray(19, bingo_marked_index) && isInArray(24, bingo_marked_index)){
            won++;
        }
        else if(isInArray(0, bingo_marked_index) && isInArray(6, bingo_marked_index) && isInArray(12, bingo_marked_index) && isInArray(18, bingo_marked_index) && isInArray(24, bingo_marked_index)){
            won++;
        }
        else if(isInArray(4, bingo_marked_index) && isInArray(8, bingo_marked_index) && isInArray(12, bingo_marked_index) && isInArray(16, bingo_marked_index) && isInArray(20, bingo_marked_index)){
            won++;
        }
    }
    if(won >= 5){
        return true;
    }
    else{
        return false;
    }
}

/* test purpose */
function generateHistoryNumbers() {
    var i = 0;
    var history_numbers_array = [];
    while(i < 50){
        var random = randomIntFromInterval(1 , 100);
        if(!isInArray(random , history_numbers_array)){
            history_numbers_array.push(random);
            i++;
        }
    }
    return history_numbers_array;
}

function bingoWin(){
    if(isWinCondition()){
        alert('wooohooo');
    }
    else if (bingo_marked_index.length < 25){
        alert('complete the game');
    }
    else {
        alert('lost');
    }
    
}

var bingoPreloadGame = function() {
    console.log("Loading bingo game");
};

bingoPreloadGame.prototype = {
    preload: function (){
        
        game.load.bitmapFont('blackrosegreen', 'assets/bitmapFonts/blackrosegreen/blackrosegreen.png', 'assets/bitmapFonts/blackrosegreen/blackrosegreen.fnt');
        
        game.load.image('bingobg', 'assets/bingobg.png');
        game.load.image('gridframe', 'assets/sprites/gridframe.png');
        game.load.image('gridlines', 'assets/sprites/gridlines.png');
        game.load.image('numbersstack', 'assets/sprites/numbersstack.png');
        game.load.image('strike', 'assets/sprites/strike.png');

        game.load.spritesheet('startButton', 'assets/spritesheet/startButton.png', 200, 100);
        game.load.spritesheet('quitButton', 'assets/spritesheet/quitButton.png', 125, 100);
        game.load.spritesheet('fullButton', 'assets/spritesheet/fullButton.png', 125, 100);
        game.load.spritesheet('bingobutton', 'assets/spritesheet/bingobutton.png', 400, 210);

    },
    create: function (){
        game.state.start('bingoRenderGame');
    }
};


var bingoStartGame = function() {
    console.log("Bingo Game start screen");
};

bingoStartGame.prototype = {
    create: function () {
        startButton = game.add.button(game.world.centerX - 95, 550, 'startButton', startBingo, this, 2, 1, 0);
    }
};

var bingoRenderGame = function() {
    console.log("Render bingo game");
};

bingoRenderGame.prototype = {
    create: function () {
        game.add.tileSprite(0, 0, 1366, 768, 'bingobg');

        quitButton = game.add.button(1300, 10, 'quitButton', quit, this, 2, 1, 0);
        fullButton = game.add.button(1250, 10, 'fullButton', goFull, this, 2, 1, 0);

        quitButton.scale.setTo(quitButton_scale, quitButton_scale);
        fullButton.scale.setTo(fullButton_scale, fullButton_scale);

        gridframe = game.add.sprite(gridframe_x , gridframe_y , 'gridframe');
        gridframe.scale.setTo(gridframe_scale, gridframe_scale);
        gridframe.anchor.setTo(gridframe_anchor_x, gridframe_anchor_y);

        gridlines = game.add.sprite(gridlines_x , gridlines_y , 'gridlines');
        gridlines.scale.setTo(gridlines_scale, gridlines_scale);
        gridlines.anchor.setTo(gridlines_anchor_x, gridlines_anchor_y);

        bingo_card_number_group = game.add.group();
        bingo_hist_bg_group = game.add.group();
        bingo_numbers_hist_grp = game.add.group();

        bingo_card_number_group.inputEnableChildren = true;

        bingotitle_button = game.add.button(bingotitle_x, bingotitle_y, 'bingobutton', bingoWin, this, 2, 1, 0);
        bingotitle_button.scale.setTo(bingotitle_scale, bingotitle_scale);
        bingotitle_button.anchor.setTo(bingotitle_anchor_x, bingotitle_anchor_y);

        generateBingoSheet();
    },

    update: function () {
        test_counter++;

        if(test_counter === 60 && current_bingo_number_index < 50){
            var num_status = true;
            while (num_status){
                var temp_num = randomIntFromInterval(1, 75);
                if(!isInArray(temp_num, bingo_numbers_history)){
                    bingo_numbers_history.push(temp_num);
                    num_status = false;
                }
            }
            test_counter = 0;
        }

        btn_glow++;
        if(btn_glow < 15){
            bingotitle_button.alpha = 0;
        }
        else{
            bingotitle_button.alpha = 1;
        }
        if(btn_glow === 30){
            btn_glow = 0;
        }

        if(isWinCondition()){
            bingotitle_button.visible = true;
        }

        if(current_bingo_number_index < bingo_numbers_history.length){
            drawHistoryNumbers();
            current_bingo_number_index++;
        }

        if(current_bingo_number_index > 0){
            glow_current_status++;
            if(glow_current_status < 15){
                bingo_hist_bg_group.children[current_bingo_number_index-1].visible = false;
            }
            else{
                bingo_hist_bg_group.children[current_bingo_number_index-1].visible = true;
            }
            if(glow_current_status === 30){
                glow_current_status = 0;
            }
        }
        
        bingo_card_number_group.onChildInputOver.add(function (sprite) {
            sprite.alpha = 0.5;
        }, this);
        bingo_card_number_group.onChildInputOut.add(function (sprite) {
            sprite.alpha = 1;
        }, this);
        bingo_card_number_group.onChildInputDown.add(function (sprite) {
            if(current_placement_index){
                var text_index = getIndex(sprite.text, bingo_card_number_group);
                if((!isInArray(text_index, bingo_marked_index)) && (isInArray(parseInt(sprite.text), bingo_numbers_history))){
                    bingo_marked_index.push(text_index);
                    strike_grp.push(new STRIKE(game, text_index));
                    current_placement_index = false;
                }
            }
        }, this);
        bingo_card_number_group.onChildInputUp.add(function (sprite) {
            current_placement_index = true;
        }, this);
    },

    render: function () {
        
    }
};

var box;
var box_x = (1366/2);
var box_y = (768/2);
var box_scale = 0.7;
var box_anchor_x = 0.5;
var box_anchor_y = 0.5;

var bluelight;
var bluelight_x = (1366/2);
var bluelight_y = (768/2) - 50;
var bluelight_scale = 0.7;
var bluelight_anchor_x = 0.5;
var bluelight_anchor_y = 0.5;

var slotbox;
var slotbox_x = (1366/2);
var slotbox_y = (768/2)-50;
var slotbox_scale = 0.7;
var slotbox_anchor_x = 0.5;
var slotbox_anchor_y = 0.5;

var slotgreen;
var slotgreen_x = (1366/2);
var slotgreen_y = (768/2)-50;
var slotgreen_scale = 0.7;
var slotgreen_anchor_x = 0.5;
var slotgreen_anchor_y = 0.5;

var slotgreen_grp;

var slot_image;
var slot_image_x = (1366/2);
var slot_image_y = (768/2)-50;
var slot_image_scale = 0.5;
var slot_image_anchor_x = 0.5;
var slot_image_anchor_y = 0.5;

var slot_image_grp1;
var slot_image_grp2;
var slot_image_grp3;

var spinbutton;
var spinbutton_x = (1366/2)+400;
var spinbutton_y = (768/2);
var spinbutton_scale = 0.8;

var bluelight_glow = 0;
var spin_slot = false;
var playAnimationSlot = false;

var slot1_temp_rn = 1;
var slot2_temp_rn = 1;
var slot3_temp_rn = 1;

var slot1_res_rn;
var slot2_res_rn
var slot3_res_rn

var counter_slot1 = 0;
var counter_slot2 = 0;
var counter_slot3 = 0;

var animation_counter = 0;

function startSlots(){
    goFull();
    game.state.start('slotsRenderGame');
}

function spinSlots(){
    spin_slot = true;
}

var slotsPreloadGame = function() {
    console.log("Loading bingo game");
};

slotsPreloadGame.prototype = {
    preload: function (){
        game.load.spritesheet('startButton', 'assets/spritesheet/startButton.png', 200, 100);
        
        game.load.image('bingobg', 'assets/slotbg.png');
        game.load.image('box', 'assets/sprites/box.png');
        game.load.image('bluelight', 'assets/sprites/bluelight.png');
        game.load.image('slotbox', 'assets/sprites/slotbox.png');
        game.load.image('slotgreen', 'assets/sprites/slotgreen.png');

        game.load.image('apple', 'assets/sprites/items/apple.png');
        game.load.image('cherry', 'assets/sprites/items/cherry.png');
        game.load.image('orange', 'assets/sprites/items/orange.png');
        game.load.image('seven', 'assets/sprites/items/seven.png');
        game.load.image('strawberry', 'assets/sprites/items/strawberry.png');
        game.load.image('watermelon', 'assets/sprites/items/watermelon.png');

        game.load.spritesheet('quitButton', 'assets/spritesheet/quitButton.png', 125, 100);
        game.load.spritesheet('fullButton', 'assets/spritesheet/fullButton.png', 125, 100);
        game.load.spritesheet('spinbutton', 'assets/spritesheet/spinbutton.png', 250, 130);

    },
    create: function (){
        game.state.start('slotsRenderGame');
    }
};


var slotsStartGame = function() {
    console.log("Bingo Game start screen");
};

slotsStartGame.prototype = {
    create: function () {
        startButton = game.add.button(game.world.centerX - 95, 550, 'startButton', startSlots, this, 2, 1, 0);
    }
};

var slotsRenderGame = function() {
    console.log("Render slots game");
};

slotsRenderGame.prototype = {
    create: function () {
        
        game.add.tileSprite(0, 0, 1366, 768, 'bingobg');

        quitButton = game.add.button(1300, 10, 'quitButton', quit, this, 2, 1, 0);
        fullButton = game.add.button(1250, 10, 'fullButton', goFull, this, 2, 1, 0);

        quitButton.scale.setTo(quitButton_scale, quitButton_scale);
        fullButton.scale.setTo(fullButton_scale, fullButton_scale);

        box = game.add.sprite(box_x , box_y, 'box');
        box.scale.setTo(box_scale, box_scale);
        box.anchor.setTo(box_anchor_x, box_anchor_y);

        bluelight = game.add.sprite(bluelight_x , bluelight_y, 'bluelight');
        bluelight.scale.setTo(bluelight_scale, bluelight_scale);
        bluelight.anchor.setTo(bluelight_anchor_x, bluelight_anchor_y);

        slotbox = game.add.sprite(slotbox_x-210, slotbox_y, 'slotbox');
        slotbox.scale.setTo(slotbox_scale, slotbox_scale);
        slotbox.anchor.setTo(slotbox_anchor_x, slotbox_anchor_y);

        slotbox = game.add.sprite(slotbox_x, slotbox_y, 'slotbox');
        slotbox.scale.setTo(slotbox_scale, slotbox_scale);
        slotbox.anchor.setTo(slotbox_anchor_x, slotbox_anchor_y);

        slotbox = game.add.sprite(slotbox_x+210, slotbox_y, 'slotbox');
        slotbox.scale.setTo(slotbox_scale, slotbox_scale);
        slotbox.anchor.setTo(slotbox_anchor_x, slotbox_anchor_y);

        slotgreen_grp = game.add.group();
        slotgreen = game.add.sprite(slotgreen_x-210,slotgreen_y, 'slotgreen');
        slotgreen.scale.setTo(slotgreen_scale, slotgreen_scale);
        slotgreen.anchor.setTo(slotgreen_anchor_x, slotgreen_anchor_y);
        slotgreen.visible = false;

        slotgreen_grp.add(slotgreen);
        
        slotgreen = game.add.sprite(slotgreen_x,slotgreen_y, 'slotgreen');
        slotgreen.scale.setTo(slotgreen_scale, slotgreen_scale);
        slotgreen.anchor.setTo(slotgreen_anchor_x, slotgreen_anchor_y);
        slotgreen.visible = false;

        slotgreen_grp.add(slotgreen);

        slotgreen = game.add.sprite(slotgreen_x+210,slotgreen_y, 'slotgreen');
        slotgreen.scale.setTo(slotgreen_scale, slotgreen_scale);
        slotgreen.anchor.setTo(slotgreen_anchor_x, slotgreen_anchor_y);
        slotgreen.visible = false;

        slotgreen_grp.add(slotgreen);

        slot_image_grp1 = game.add.group();
        slot_image_grp2 = game.add.group();
        slot_image_grp3 = game.add.group();

        var images_array = ['apple', 'cherry', 'orange', 'seven', 'strawberry', 'watermelon'];
        for(var i = 0 ; i < images_array.length ; i++){
            slot_image = game.add.sprite(slot_image_x-210, slot_image_y, images_array[i]);
            slot_image.scale.setTo(slot_image_scale, slot_image_scale);
            slot_image.anchor.setTo(slot_image_anchor_x, slot_image_anchor_y);
            slot_image.visible = false;
            slot_image_grp1.add(slot_image);
        }
        
        for(var i = 0 ; i < images_array.length ; i++){
            slot_image = game.add.sprite(slot_image_x, slot_image_y, images_array[i]);
            slot_image.scale.setTo(slot_image_scale, slot_image_scale);
            slot_image.anchor.setTo(slot_image_anchor_x, slot_image_anchor_y);
            slot_image.visible = false;
            slot_image_grp2.add(slot_image);
        }

        for(var i = 0 ; i < images_array.length ; i++){
            slot_image = game.add.sprite(slot_image_x+210, slot_image_y, images_array[i]);
            slot_image.scale.setTo(slot_image_scale, slot_image_scale);
            slot_image.anchor.setTo(slot_image_anchor_x, slot_image_anchor_y);
            slot_image.visible = false;
            slot_image_grp3.add(slot_image);
        }

        spinbutton = game.add.button(spinbutton_x, spinbutton_y, 'spinbutton', spinSlots, this, 2, 1, 0);
        spinbutton.scale.setTo(spinbutton_scale, spinbutton_scale);
    },

    update: function () {
        bluelight_glow++;
        if(bluelight_glow < 15){
            bluelight.alpha = 0.5;
        }
        else{
            bluelight.alpha = 1;
        }
        if(bluelight_glow === 30){
            bluelight_glow = 0;
        }

        if(spin_slot){
            var temp_min = randomIntFromInterval(1, 6);
            while(true){
                var temp_max = randomIntFromInterval(1, 6);
                if(temp_max > temp_min){
                    break;
                }
            }
            
            slot1_res_rn = randomIntFromInterval(temp_min, temp_max);
            slot2_res_rn = randomIntFromInterval(temp_min, temp_max);
            slot3_res_rn = randomIntFromInterval(temp_min, temp_max);

            counter_slot1 = 0;
            counter_slot2 = 0;
            counter_slot3 = 0;

            slot_image_grp1.children[slot1_res_rn-1].visible = false;
            slot_image_grp2.children[slot1_res_rn-1].visible = false;
            slot_image_grp3.children[slot1_res_rn-1].visible = false;

            slot1_temp_rn = 1;
            slot2_temp_rn = 1;
            slot3_temp_rn = 1;

            slotgreen_grp.children[0].visible = false;
            slotgreen_grp.children[1].visible = false;
            slotgreen_grp.children[2].visible = false;

            spin_slot = false;
            playAnimationSlot = true;
        }

        if(playAnimationSlot){
            animation_counter++;
            if(animation_counter === 5){

                counter_slot1++;
                counter_slot2++;
                counter_slot3++;

                if(counter_slot1 > 20){
                    slot_image_grp1.children[slot1_temp_rn-1].visible = false;
                    slot_image_grp1.children[slot1_res_rn-1].visible = true;
                    slotgreen_grp.children[0].visible = true;
                }
                else{
                    slot_image_grp1.children[slot1_temp_rn-1].visible = false;
                    slot1_temp_rn = randomIntFromInterval(1 , 6);
                    slot_image_grp1.children[slot1_temp_rn-1].visible = true;
                }
                if(counter_slot2 > 30){
                    slot_image_grp2.children[slot2_temp_rn-1].visible = false;
                    slot_image_grp2.children[slot2_res_rn-1].visible = true;
                    slotgreen_grp.children[1].visible = true;
                }
                else{
                    slot_image_grp2.children[slot2_temp_rn-1].visible = false;
                    slot2_temp_rn = randomIntFromInterval(1 , 6);
                    slot_image_grp2.children[slot2_temp_rn-1].visible = true;
                }
                if(counter_slot3 > 40){
                    slot_image_grp3.children[slot3_temp_rn-1].visible = false;
                    slot_image_grp3.children[slot3_res_rn-1].visible = true;
                    slotgreen_grp.children[2].visible = true;
                    playAnimationSlot = false;
                    if(slot1_res_rn === slot2_res_rn && slot1_res_rn === slot3_res_rn && slot2_res_rn === slot3_res_rn){
                        alert('Winner');
                    }
                }
                else{
                    slot_image_grp3.children[slot3_temp_rn-1].visible = false;
                    slot3_temp_rn = randomIntFromInterval(1 , 6);
                    slot_image_grp3.children[slot3_temp_rn-1].visible = true;
                }

            }
            if(animation_counter === 10){
                animation_counter = 0;
            }
        }

    },

    render: function () {

    }
};

game.state.add('bootState', bootState);

game.state.add('roulletPreloadGame', roulletPreloadGame);
game.state.add('roulletStartGame', roulletStartGame);
game.state.add('roulletRenderGame', roulletRenderGame);

game.state.add('bingoPreloadGame', bingoPreloadGame);
game.state.add('bingoStartGame', bingoStartGame);
game.state.add('bingoRenderGame', bingoRenderGame);

game.state.add('slotsPreloadGame', slotsPreloadGame);
game.state.add('slotsStartGame', slotsStartGame);
game.state.add('slotsRenderGame', slotsRenderGame);

game.state.start('bootState');