var bb8Key = require('./bb8.json');
var Cylon = require('cylon');

Cylon.robot({
    connections: {
        bluetooth: { adaptor: 'central', uuid: bb8Key.uuid, module: 'cylon-ble'}
    },

    devices: {
        bb8: { driver: 'bb8', module: 'cylon-sphero-ble'},
    },

    work: (my) => {
        my.bb8.color(0xFF0000);
        my.bb8.roll(60, 0);
        after(1000, function() {
            my.bb8.roll(60, 90);
        });
        after(2000, function() {
            my.bb8.roll(60, 180);
        });
        after(3000, function() {
            my.bb8.roll(60, 270);
        });
        after(4000, function() {
            my.bb8.stop();
            my.bb8.spin('right', 100);
        });
        after(5000, function() {
            my.bb8.spin('left', 100);
        });
        after(6000, function() {
            my.bb8.stop();
            my.bb8.randomColor();
        });
    }
}).start();
