var Cylon = require('cylon');

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
        });
        my.keyboard.on('down', function(key) {
            console.log("DOWN PRESSED!");
        });
        my.keyboard.on('left', function(key) {
            console.log("LEFT PRESSED!");
        });
        my.keyboard.on('right', function(key) {
            console.log("RIGHT PRESSED!");
        });
    }
}).start();
