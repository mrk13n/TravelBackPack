(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
$(function () {
    google.maps.event.addDomListener(window, 'load', initializeMaps);
});

function initializeMaps() {
    var mapProportions = {
        center: new google.maps.LatLng(49.496675, 15.380859),
        zoom: 4
    };
    var html_element = document.getElementById('maps');
    var map = new google.maps.Map(html_element, mapProportions);
}
},{}]},{},[1]);
