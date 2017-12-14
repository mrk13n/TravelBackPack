$(document).ready(function() {
    $("#city-scroll").click(function () {
        scrollTo();
    });

    function scrollTo() {
        $('html, body').animate({scrollTop: $('.our-team').offset().top}, 'slow');
        return false;
    };
});