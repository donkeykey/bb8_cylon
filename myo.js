"use strict";

var Cylon = require("cylon");

Cylon.robot({
    connections: {
        myo: { adaptor: "myo", app_name: "f001ec35439d4449879d0cf06405be9b" }
    },

    devices: {
        myo_device: { driver: "myo" }
    },

    work: function(my) {
        my.myo_device.on("navdata", function(data) {
            console.log(data);
        });
        my.myo_device.on('connected', function(){
            console.log('connected');
        });
        my.myo_device.on('fist', function(){
            console.log('fist');
        });
        my.myo_device.on('orientation', function(data) {
            console.log("orientation: " + JSON.stringify(data, null, 2));
        });
        my.myo_device.on('status', function(data){
            console.log("status: " + JSON.stringify(data, null, 2));
        });
        my.myo_device.on('pose', function(pose){
            console.log("pose: " + JSON.stringify(pose, null, 2));
        });
        my.myo_device.on('pose_off', function(pose){
            console.log("pose off: " + JSON.stringify(pose, null, 2));
        });
        my.myo_device.on('locked', function(){
            console.log("locked: ");
        });
        my.myo_device.on('unlocked', function(){
            console.log("unlocked: ");
        });
    }
}).start();
