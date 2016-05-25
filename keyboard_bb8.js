var Cylon = require('cylon');
var bb8Key = require('./bb8.json');
var bb;

Cylon.robot({
    connections: {
        keyboard: { adaptor: 'keyboard' }
    },

    devices: {
        keyboard: { driver: 'keyboard' }
    },

    work: function(my) {
        my.keyboard.on('up', function(key) {
            console.log("UP PRESSED!");
            bb.bb8.roll(60, 0);
        });
        my.keyboard.on('down', function(key) {
            console.log("DOWN PRESSED!");
            bb.bb8.roll(60, 180);
        });
        my.keyboard.on('left', function(key) {
            console.log("LEFT PRESSED!");
            bb.bb8.roll(60, 90);
        });
        my.keyboard.on('right', function(key) {
            console.log("RIGHT PRESSED!");
            bb.bb8.roll(60, 270);
        });
        my.keyboard.on('l', function(key) {
            console.log("L PRESSED!");
            bb.bb8.spin('left', 100);
        });
        my.keyboard.on('r', function(key) {
            console.log("R PRESSED!");
            bb.bb8.spin('right', 100);
        });
        my.keyboard.on('c', function(key) {
            console.log("C PRESSED!");
            bb.bb8.randomColor();
        });
        my.keyboard.on('s', function(key) {
            console.log("S PRESSED!");
            bb.bb8.stop();
        });
    }
}).start();

Cylon.robot({
    connections: {
        bluetooth: { adaptor: 'central', uuid: bb8Key.uuid, module: 'cylon-ble'}
    },

    devices: {
        bb8: { driver: 'bb8', module: 'cylon-sphero-ble'},
    },

    work: (my) => {
        bb = my;
        bb.bb8.color(0xFFFFFF);
    }
}).start();

