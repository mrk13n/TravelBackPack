var Storage = require('./LocalStorage');
var Templates = require('./Teamplates');
var $com = $('#com');

$(function () {
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

    initializeFavorites();
});

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


function showComments(list) {
    $com.html("");

    function showOneComment(comment) {
        var Backpack = getBackpack();
        var html_code = Templates.Comment_OneItem({comment: comment});

        var $node = $(html_code);

        $com.append($node);

        $node.find('.favorite').click(function () {
            for (var i = 0; i < Backpack.length; i++) {
                if (comment.comment._id == Backpack[i].comment._id) {
                    removeFromStorrage(Backpack, i);
                    initializeFavorites();
                }
            }
        });
    }

    list.forEach(showOneComment);
}

function initializeFavorites() {
    var Backpack = getBackpack();
    showComments(Backpack);
}

function getBackpack() {
    return Storage.get('backpack');
}

function removeFromStorrage(back, i) {
    back.splice(i, 1);
    Storage.set('backpack', back);
}