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