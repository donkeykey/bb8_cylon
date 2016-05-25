var myThingsKey = require('./myThingsKey.json');
var bb8Key = require('./bb8.json');
var meshblu = require('meshblu');
var Cylon = require('cylon');
var conn1 = meshblu.createConnection(myThingsKey[0]);
var bb;

Cylon.robot({
    connections: {
        bluetooth: { adaptor: 'central', uuid: bb8Key.uuid, module: 'cylon-ble'}
    },

    devices: {
        bb8: { driver: 'bb8', module: 'cylon-sphero-ble'},
    },

    work: (my) => {
        bb = my;
    }
}).start();

conn1.on('ready', function(data){
    console.log('Ready1');

    conn1.on('message', function(data){
        console.log(data);
        bb.bb8.color(0xFF0000);
        bb.bb8.roll(60, 0);
        after(1000, function() {
            bb.bb8.roll(60, 90);
        });
        after(2000, function() {
            bb.bb8.roll(60, 180);
        });
        after(3000, function() {
            bb.bb8.roll(60, 270);
        });
        after(4000, function() {
            bb.bb8.stop();
            bb.bb8.spin('right', 100);
        });
        after(5000, function() {
            bb.bb8.spin('left', 100);
        });
        after(6000, function() {
            bb.bb8.stop();
            bb.bb8.randomColor();
        });
    });
});
