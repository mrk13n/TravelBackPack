const signUp = require('./Authorization/registration');
const signIn = require('./Authorization/login');
const logOut = require('./Authorization/logout');
let icon_position = true;

function common(login, user, page) {

    if (login) {
        $('.logined').css('display', 'block');
        $('.name').html(user);

        $('.btn-add').click(() => {
            $('#form').slideToggle(400);
            $('.form-control.location-name').removeClass('has-error');
            $('#helpLocationName').css('display', 'none');
            scrollDown();

            //Add comment button icon arrow position
            if (icon_position) {
                $('#right').removeClass('glyphicon glyphicon-chevron-right img-circle');
                $('#right').addClass('glyphicon glyphicon-chevron-up img-circle');
                icon_position = !icon_position;
            } else {
                $('#right').removeClass('glyphicon glyphicon-chevron-up img-circle');
                $('#right').addClass('glyphicon glyphicon-chevron-right img-circle');
                icon_position = !icon_position;
            }
        });
    } else {
        $('.glyphicon-user').css('display', 'block');
        $('.btn-add').css('cursor', 'not-allowed');
    }

    //top menu auth
    $('.glyphicon-user').click(() => {
        $('#log-menu').css('display', 'block');
    });

    $('.glyphicon-remove').click(() => {
        $('#log-menu').css('display', 'none');
    });

    $('.glyphicon-off').click(() => {
        $('#exit-menu').css('display', 'block');
    });

    $('.not-end').click(() => {
        $('#exit-menu').css('display', 'none');
    });

    $('.to-reg').click(() => {
        $('#login').css('display', 'none');
        $('#registration').css('display', 'block');
    });

    $('.back').click(() => {
        $('#registration').css('display', 'none');
        $('#login').css('display', 'block');
    });

    $('.reg').click(() => {
        signUp(page);
    });

    $('.log').click(() => {
        signIn(page);
    });

    $('.end').click(() => {
        logOut(page);
    });

    $(window).scroll(function() {
        if($(window).scrollTop() + $(window).height() == $(document).height()) {
            $('.scroll-page').hide(300);
        } else {
            $('.scroll-page').show(300);
        }
    });
    //scroll down
    $(".scroll-page").click(function () {
        scrollDown();
    });

    //nice staff animation
    $('#staff').click(() => {
        $('body').css('overflow-y', 'hidden');
        $('.niceStaff').css('display', 'block');
        $('.niceStaff').animate({'bottom':'0'}, 500);
        setTimeout(() => {
            $('.niceStaff').animate({'bottom':'-200px'}, 500);
        }, 1600);
        setTimeout(() => {
            $('.niceStaff').css('display', 'none');
            $('body').css('overflow-y', 'visible');
        }, 2200);
    });

    //hide preloader when all loaded
    $('.preloader').fadeOut('slow');
    $('body').css('overflow-y', 'visible');
}

function scrollDown() {
    $('html, body').animate({ scrollTop: $('.btn-add').offset().top }, 1000);
    return false;
}

module.exports = common;