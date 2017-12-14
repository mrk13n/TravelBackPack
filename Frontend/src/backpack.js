$(".city-favourite-comments-panel").click(function(){
    $(this).addClass("open-window");
});

$("#city-scroll").click(function(){
    scrollTo();
   // randomAvatar();
});

function scrollTo() {
    $('html, body').animate({ scrollTop: $('.greetings-backpack').offset().top }, 'slow');
    return false;
}

function randomAvatar(){
    var rand;
    rand = Math.floor((Math.random() * 20) + 1);
    var img_src = "logo.png";
    var image = document.createElement("img");
    var imageParent = document.getElementById("lol");
    image.className = "img-responsive user-photo";
    image.src = "assets/images/" + img_src;
    imageParent.appendChild(image);
}