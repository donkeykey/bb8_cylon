var myThingsKey = require('./myThingsKey.json');
var bb8Key = require('./bb8.json');
var meshblu = require('meshblu');
var Cylon = require('cylon');
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
    }
}).start();

// 天気予報
conn3.on('ready', function(data){
    console.log('Ready3');

    conn3.on('message', function(data){
        console.log(data.payload);
        var b = Math.floor(Number(data.payload) * (255/100));
        var g = Math.floor(255 - b);
        var r = 0;
        var rgb = "rgb(" + r + ", " + g + ", " + b + ")";
        console.log(rgb);
        bb.bb8.color(colorGen(rgb));
    });
});
