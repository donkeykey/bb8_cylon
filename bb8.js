var myThingsKey = require('./myThingsKey.json');
var bb8Key = require('./bb8.json');
var meshblu = require('meshblu');
var Cylon = require('cylon');
var conn1 = meshblu.createConnection(myThingsKey[0]);
var conn2 = meshblu.createConnection(myThingsKey[1]);
var conn3 = meshblu.createConnection(myThingsKey[2]);
var bb;

function colorGen (col) {
    var c = col.match(/\d+/g).map(function(a){return ("0" + parseInt(a).toString(16)).slice(-2)}).join("");
    return parseInt(c, 16);
}

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

conn1.on('ready', function(data){
    console.log('Ready1');

    conn1.on('message', function(data){
        console.log(data);
        bb.bb8.randomColor();
        bb.bb8.roll(100, 0);
        after(1500, function() {
            bb.bb8.randomColor();
            bb.bb8.roll(100, 90);
        });
        after(3000, function() {
            bb.bb8.randomColor();
            bb.bb8.roll(100, 180);
        });
        after(4500, function() {
            bb.bb8.randomColor();
            bb.bb8.roll(100, 270);
        });
        after(6000, function() {
            bb.bb8.randomColor();
            bb.bb8.stop();
        });
    });

});

// ボタン押したら
conn2.on('ready', function(data){
    console.log('Ready2');

    conn2.on('message', function(data){
        console.log(data);
        bb.bb8.color(colorGen("rgb(255, 0, 0)"));
        bb.bb8.spin('left', 100);
        after(200, function() {
            bb.bb8.color(colorGen("rgb(0, 255, 0)"));
            bb.bb8.spin('right', 100);
        });
        after(600, function() {
            bb.bb8.color(colorGen("rgb(0, 0, 255)"));
            bb.bb8.spin('left', 100);
        });
        after(800, function() {
            bb.bb8.color(colorGen("rgb(255, 0, 255)"));
            bb.bb8.stop();
        });
    });

});

// 天気予報
conn3.on('ready', function(data){
    console.log('Ready3');

    conn3.on('message', function(data){
        console.log(data.payload);
        var b = Math.floor(Number(data.payload) * (255/100));
        var r = Math.floor(255 - b);
        var g = Math.floor(r);
        var rgb = "rgb(" + r + ", " + g + ", " + b + ")";
        console.log(rgb);
        bb.bb8.color(colorGen(rgb));
    });
});
