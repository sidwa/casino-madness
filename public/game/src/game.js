
/* global Phaser, PIXI */

/* jquery node module */
//var $ = require('jquery');

/* phaser node module */
// window.PIXI = require('phaser/build/custom/pixi');
// window.p2 = require('phaser/build/custom/p2');
// window.Phaser = require('phaser/build/custom/phaser-split');

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

        this.load.image('wheel', 'assets/sprites/wheel.png');
        this.load.image('selector', 'assets/sprites/selector.png');
        this.load.image('table' , 'assets/sprites/table.png');

        this.load.image('slot_0', 'assets/sprites/87x150/0.png');
        this.load.image('slot_00', 'assets/sprites/87x150/00.png');

        this.load.image('slot_1', 'assets/sprites/73x100/1.png');
        this.load.image('slot_2', 'assets/sprites/73x100/2.png');
        this.load.image('slot_3', 'assets/sprites/73x100/3.png');
        this.load.image('slot_4', 'assets/sprites/73x100/4.png');
        this.load.image('slot_5', 'assets/sprites/73x100/5.png');
        this.load.image('slot_6', 'assets/sprites/73x100/6.png');
        this.load.image('slot_7', 'assets/sprites/73x100/7.png');
        this.load.image('slot_8', 'assets/sprites/73x100/8.png');
        this.load.image('slot_9', 'assets/sprites/73x100/9.png');
        this.load.image('slot_10', 'assets/sprites/73x100/10.png');
        this.load.image('slot_11', 'assets/sprites/73x100/11.png');
        this.load.image('slot_12', 'assets/sprites/73x100/12.png');
        this.load.image('slot_13', 'assets/sprites/73x100/13.png');
        this.load.image('slot_14', 'assets/sprites/73x100/14.png');
        this.load.image('slot_15', 'assets/sprites/73x100/15.png');
        this.load.image('slot_16', 'assets/sprites/73x100/16.png');
        this.load.image('slot_17', 'assets/sprites/73x100/17.png');
        this.load.image('slot_18', 'assets/sprites/73x100/18.png');
        this.load.image('slot_19', 'assets/sprites/73x100/19.png');
        this.load.image('slot_20', 'assets/sprites/73x100/20.png');
        this.load.image('slot_21', 'assets/sprites/73x100/21.png');
        this.load.image('slot_22', 'assets/sprites/73x100/22.png');
        this.load.image('slot_23', 'assets/sprites/73x100/23.png');
        this.load.image('slot_24', 'assets/sprites/73x100/24.png');
        this.load.image('slot_25', 'assets/sprites/73x100/25.png');
        this.load.image('slot_26', 'assets/sprites/73x100/26.png');
        this.load.image('slot_27', 'assets/sprites/73x100/27.png');
        this.load.image('slot_28', 'assets/sprites/73x100/28.png');
        this.load.image('slot_29', 'assets/sprites/73x100/29.png');
        this.load.image('slot_30', 'assets/sprites/73x100/30.png');
        this.load.image('slot_31', 'assets/sprites/73x100/31.png');
        this.load.image('slot_32', 'assets/sprites/73x100/32.png');
        this.load.image('slot_33', 'assets/sprites/73x100/33.png');
        this.load.image('slot_34', 'assets/sprites/73x100/34.png');
        this.load.image('slot_35', 'assets/sprites/73x100/35.png');
        this.load.image('slot_36', 'assets/sprites/73x100/36.png');

        this.load.image('slot_2to1_1', 'assets/sprites/73x100/2to1-1.png');
        this.load.image('slot_2to1_2', 'assets/sprites/73x100/2to1-2.png');
        this.load.image('slot_2to1_3', 'assets/sprites/73x100/2to1-3.png');

        this.load.image('slot_1-12', 'assets/sprites/294x92/1-12.png');
        this.load.image('slot_2-12', 'assets/sprites/294x92/2-12.png');
        this.load.image('slot_3-12', 'assets/sprites/294x92/3-12.png');

        this.load.image('slot_1-18', 'assets/sprites/146x92/1-18.png');
        this.load.image('slot_19-36', 'assets/sprites/146x92/19-36.png');
        this.load.image('slot_black', 'assets/sprites/146x92/black.png');
        this.load.image('slot_red', 'assets/sprites/146x92/red.png');
        this.load.image('slot_even', 'assets/sprites/146x92/even.png');
        this.load.image('slot_odd', 'assets/sprites/146x92/odd.png');
        
        this.load.spritesheet('startButton', 'assets/spritesheet/startButton.png', 200, 100);
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
        //game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;

        game.time.desiredFps = 60;

        console.log(window.innerHeight);
        console.log(window.innerWidth);
        
        var table_x = game.world.centerX;
        var table_y = game.world.centerY-75;
        var table_scale = 0.8;
        var table_anchor_x = 0.5;
        var table_anchor_y = 0.5;

        var wheel_x = 300;
        var wheel_y = game.world.centerY-75;
        var wheel_scale = 0.7;
        var wheel_anchor_x = 0.5;
        var wheel_anchor_y = 0.5;

        var selector_x = 300;
        var selector_y = game.world.centerY-75;
        var selector_scale = 0.7;
        var selector_anchor_x = 0.5;
        var selector_anchor_y = 0.5;

        var number_position_x = 550;
        var number_position_y = 150;
        var number_scale = 0.65;

        var number_block_1_resolution_x = 87;
        var number_block_1_resolution_y = 150;

        var number_block_2_resolution_x = 73;
        var number_block_2_resolution_y = 100;

        var number_block_3_resolution_x = 294;
        var number_block_3_resolution_y = 92;
        
        var number_block_4_resolution_x = 146;
        var number_block_4_resolution_y = 92;

        // this.table = this.add.sprite(table_x, table_y, 'table');
        // this.table.scale.setTo(table_scale, table_scale);
        // this.table.anchor.setTo(table_anchor_x, table_anchor_y);
        
        this.wheel = this.add.sprite(wheel_x, wheel_y, 'wheel');
        this.wheel.scale.setTo(wheel_scale, wheel_scale);
        this.wheel.anchor.setTo(wheel_anchor_x, wheel_anchor_y);

        this.selector = this.add.sprite(selector_x, selector_y, 'selector');
        this.selector.scale.setTo(selector_scale, selector_scale);
        this.selector.anchor.setTo(selector_anchor_x, selector_anchor_y);

        this.slot_0 = this.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*0)), (number_position_y+(number_scale*number_block_1_resolution_y*0)) , 'slot_0');
        this.slot_0.scale.setTo(number_scale, number_scale);
        this.slot_00 = this.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*0)), (number_position_y+(number_scale*number_block_1_resolution_y*1)), 'slot_00');
        this.slot_00.scale.setTo(number_scale, number_scale);

        this.slot_1 = this.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)), (number_position_y+(number_scale*number_block_2_resolution_y*2)), 'slot_1');
        this.slot_1.scale.setTo(number_scale, number_scale);
        this.slot_2 = this.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)), (number_position_y+(number_scale*number_block_2_resolution_y*1)), 'slot_2');
        this.slot_2.scale.setTo(number_scale, number_scale);
        this.slot_3 = this.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)), (number_position_y+(number_scale*number_block_2_resolution_y*0)), 'slot_3');
        this.slot_3.scale.setTo(number_scale, number_scale);

        this.slot_4 = this.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*1)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*2)), 'slot_4');
        this.slot_4.scale.setTo(number_scale, number_scale);
        this.slot_5 = this.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*1)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*1)), 'slot_5');
        this.slot_5.scale.setTo(number_scale, number_scale);
        this.slot_6 = this.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*1)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*0)), 'slot_6');
        this.slot_6.scale.setTo(number_scale, number_scale);

        this.slot_7 = this.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*2)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*2)), 'slot_7');
        this.slot_7.scale.setTo(number_scale, number_scale);
        this.slot_8 = this.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*2)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*1)), 'slot_8');
        this.slot_8.scale.setTo(number_scale, number_scale);
        this.slot_9 = this.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*2)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*0)), 'slot_9');
        this.slot_9.scale.setTo(number_scale, number_scale);

        this.slot_10 = this.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*3)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*2)), 'slot_10');
        this.slot_10.scale.setTo(number_scale, number_scale);
        this.slot_11 = this.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*3)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*1)), 'slot_11');
        this.slot_11.scale.setTo(number_scale, number_scale);
        this.slot_12 = this.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*3)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*0)), 'slot_12');
        this.slot_12.scale.setTo(number_scale, number_scale);

        this.slot_13 = this.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*4)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*2)), 'slot_13');
        this.slot_13.scale.setTo(number_scale, number_scale);
        this.slot_14 = this.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*4)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*1)), 'slot_14');
        this.slot_14.scale.setTo(number_scale, number_scale);
        this.slot_15 = this.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*4)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*0)), 'slot_15');
        this.slot_15.scale.setTo(number_scale, number_scale);

        this.slot_16 = this.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*5)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*2)), 'slot_16');
        this.slot_16.scale.setTo(number_scale, number_scale);
        this.slot_17 = this.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*5)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*1)), 'slot_17');
        this.slot_17.scale.setTo(number_scale, number_scale);
        this.slot_18 = this.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*5)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*0)), 'slot_18');
        this.slot_18.scale.setTo(number_scale, number_scale);

        this.slot_19 = this.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*6)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*2)), 'slot_19');
        this.slot_19.scale.setTo(number_scale, number_scale);
        this.slot_20 = this.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*6)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*1)), 'slot_20');
        this.slot_20.scale.setTo(number_scale, number_scale);
        this.slot_21 = this.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*6)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*0)), 'slot_21');
        this.slot_21.scale.setTo(number_scale, number_scale);

        this.slot_22 = this.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*7)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*2)), 'slot_22');
        this.slot_22.scale.setTo(number_scale, number_scale);
        this.slot_23 = this.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*7)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*1)), 'slot_23');
        this.slot_23.scale.setTo(number_scale, number_scale);
        this.slot_24 = this.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*7)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*0)), 'slot_24');
        this.slot_24.scale.setTo(number_scale, number_scale);

        this.slot_25 = this.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*8)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*2)), 'slot_25');
        this.slot_25.scale.setTo(number_scale, number_scale);
        this.slot_26 = this.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*8)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*1)), 'slot_26');
        this.slot_26.scale.setTo(number_scale, number_scale);
        this.slot_27 = this.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*8)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*0)), 'slot_27');
        this.slot_27.scale.setTo(number_scale, number_scale);

        this.slot_28 = this.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*9)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*2)), 'slot_28');
        this.slot_28.scale.setTo(number_scale, number_scale);
        this.slot_29 = this.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*9)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*1)), 'slot_29');
        this.slot_29.scale.setTo(number_scale, number_scale);
        this.slot_30 = this.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*9)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*0)), 'slot_30');
        this.slot_30.scale.setTo(number_scale, number_scale);

        this.slot_31 = this.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*10)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*2)), 'slot_31');
        this.slot_31.scale.setTo(number_scale, number_scale);
        this.slot_32 = this.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*10)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*1)), 'slot_32');
        this.slot_32.scale.setTo(number_scale, number_scale);
        this.slot_33 = this.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*10)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*0)), 'slot_33');
        this.slot_33.scale.setTo(number_scale, number_scale);

        this.slot_34 = this.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*11)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*2)), 'slot_34');
        this.slot_34.scale.setTo(number_scale, number_scale);
        this.slot_35 = this.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*11)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*1)), 'slot_35');
        this.slot_35.scale.setTo(number_scale, number_scale);
        this.slot_36 = this.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*11)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*0)), 'slot_36');
        this.slot_36.scale.setTo(number_scale, number_scale);

        this.slot_2to1_1 = this.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*12)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*2)), 'slot_2to1_1');
        this.slot_2to1_1.scale.setTo(number_scale, number_scale);
        this.slot_2to1_2 = this.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*12)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*1)), 'slot_2to1_2');
        this.slot_2to1_2.scale.setTo(number_scale, number_scale);
        this.slot_2to1_3 = this.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_2_resolution_x*12)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*0)), 'slot_2to1_3');
        this.slot_2to1_3.scale.setTo(number_scale, number_scale);

        this.slot_1_12 = this.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_3_resolution_x*0)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*3)), 'slot_1-12');
        this.slot_1_12.scale.setTo(number_scale, number_scale);
        this.slot_2_12 = this.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_3_resolution_x*1)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*3)), 'slot_2-12');
        this.slot_2_12.scale.setTo(number_scale, number_scale);
        this.slot_3_12 = this.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_3_resolution_x*2)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*3)), 'slot_3-12');
        this.slot_3_12.scale.setTo(number_scale, number_scale);

        this.slot_1_to_18 = this.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_4_resolution_x*0)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*3)+(number_scale*number_block_3_resolution_y*1)), 'slot_1-18');
        this.slot_1_to_18.scale.setTo(number_scale, number_scale);
        this.slot_even = this.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_4_resolution_x*1)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*3)+(number_scale*number_block_3_resolution_y*1)), 'slot_even');
        this.slot_even.scale.setTo(number_scale, number_scale);
        this.slot_red = this.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_4_resolution_x*2)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*3)+(number_scale*number_block_3_resolution_y*1)), 'slot_red');
        this.slot_red.scale.setTo(number_scale, number_scale);
        this.slot_black = this.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_4_resolution_x*3)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*3)+(number_scale*number_block_3_resolution_y*1)), 'slot_black');
        this.slot_black.scale.setTo(number_scale, number_scale);
        this.slot_odd = this.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_4_resolution_x*4)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*3)+(number_scale*number_block_3_resolution_y*1)), 'slot_odd');
        this.slot_odd.scale.setTo(number_scale, number_scale);
        this.slot_19_to_36 = this.add.sprite((number_position_x+(number_scale*number_block_1_resolution_x*1)+(number_scale*number_block_4_resolution_x*5)), (number_position_y+(number_scale*number_block_1_resolution_y*0)+(number_scale*number_block_2_resolution_y*3)+(number_scale*number_block_3_resolution_y*1)), 'slot_19-36');
        this.slot_19_to_36.scale.setTo(number_scale, number_scale);
        
    },

    update: function() {
        this.selector.angle += 2;
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