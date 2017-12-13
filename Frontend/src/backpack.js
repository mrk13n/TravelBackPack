$(".city-favourite-comments-panel").click(function(){
    $(this).addClass("open-window");
});

$("#city-scroll").click(function(){
    scrollTo();
});

function scrollTo() {
    $('html, body').animate({ scrollTop: $('.backpack-container').offset().top }, 'slow');
    return false;
}