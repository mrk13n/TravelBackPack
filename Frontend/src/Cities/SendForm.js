const API = require('../API');
const Templates = require('../Teamplates');
const imageViewer = document.getElementById('fs-img-panel');
const largeImg = document.getElementById("fs-img-block");
const captionText = document.getElementById("fs-img-caption");
const $comments = $('#comments');
const $sendForm = $('#sendForm');
let img;

async function initializeSendForm(username, city, type) {
    $sendForm.html('');
    const html_code = Templates.SendForm();
    const $node = $(html_code);
    $node.find('.nickname').html(username);
    $node.find('#img').on('change', readFile);

    $node.find('.btn-send').click(async () => {
        const nowDate = new Date();
        let day = nowDate.getDate();
        let month = nowDate.getMonth() + 1;
        let year = nowDate.getFullYear();
        let hour = nowDate.getHours();
        let minutes = nowDate.getMinutes();
        if (day < 10) day = '0'+ day;
        if (month < 10) month = '0' + month;
        const date = day + '-' + month + '-' + year + ' ' + hour + ':' + minutes;
        const comment = $('#comment').val();
        const nickname = username;
        const locationName = $('.location-name').val();

        const sendComment = {
            nickname: nickname,
            comment: comment,
            locationName: locationName,
            city: city.city,
            date: date,
            type: type,
            img: img
        };

        if (validateForm(comment, locationName)) {
            $('.preloader').css('opacity', '0.75').fadeIn('slow', () => {});

            await API.writeComment(sendComment, (err, data) => {
               if (err) throw new Error(err);

                const one = {
                    city: city.city,
                    favorite: false,
                    comment: data
                };

                showOneComment(one);
            });

            waitToLoad();
            $node.slideToggle(400);
            $node.find('#comment').val('');
            $node.find('.location-name').val('');
            $node.find('#img').val('');
            $('#right').removeClass('glyphicon glyphicon-chevron-up img-circle');
            $('#right').addClass('glyphicon glyphicon-chevron-right img-circle');
        }
    });

    $sendForm.append($node);
}

function validateForm(comment, locationName) {
    let valid = true;
    if (comment.length === 0) {
        $('.form-comment').addClass('has-error');
        $('#helpComment').css('display', 'block');
        valid = false;
    } else {
        $('.form-comment').removeClass('has-error');
        $('#helpComment').css('display', 'none');
    }
    if (locationName.length === 0) {
        $('.form-location-name').addClass('has-error');
        $('#helpLocationName').css('display', 'block');
        valid = false;
    } else {
        $('.form-location-name').removeClass('has-error');
        $('#helpLocationName').css('display', 'none');
    }
    return valid;
}

function readFile() {
    const files = this.files;
    let size = 0;
    img = [];
    if (files.length > 3) {
        alert('You can upload only 3 images!');
        $('#img').val('');
    } else {
        for (let i = 0; i < files.length; i++) {
            const fr = new FileReader();
            const file = files[i];
            size += file.size;
            fr.addEventListener("load", function (event) {
                const picFile = event.target.result;
                img.push(picFile);
            });
            fr.readAsDataURL(file);
        }
        console.log(size);
    }
}

function showOneComment(comment) {
    const html_code = Templates.Comment_OneItem({ comment: comment });
    const $node = $(html_code);

    $node.find('.favourite-btn').hover(() => {
        $node.find('.favourite-btn').css('cursor', 'pointer');
    });

    $node.find('.favourite-btn').click(async () => {
        if (comment.favorite) {
            comment.favorite = !comment.favorite;
            const newBackpack = {
                comment: comment.comment,
                city: comment.city,
                add: false
            };
            $('.preloader').css('opacity', '0.75').fadeIn('slow', () => {});
            await API.setBackpack(newBackpack, (err, data) => {
                if (err) throw new Error(err);
                backpack = data;
            });
            waitToLoad();
            $node.find('.favourite-btn').attr('src', 'assets/images/icons/icons8-add-to-favorites-96.png');
        } else {
            comment.favorite = !comment.favorite;
            const newBackpack = {
                comment: comment.comment,
                city: comment.city,
                add: true
            };
            $('.preloader').css('opacity', '0.75').fadeIn('slow', () => {});
            await API.setBackpack(newBackpack, (err, data) => {
                if (err) throw new Error(err);
                backpack = data;
            });
            waitToLoad();
            $node.find('.favourite-btn').attr('src', 'assets/images/icons/icons8-star-filled-96.png');
        }
    });

    $node.find('.uploaded-img').click(function() {
        imageViewer.style.display = "block";
        $('body').css('overflow-y', 'hidden');
        largeImg.src = this.src;
        captionText.innerHTML = this.alt;
        const spanClose = document.getElementById('img-panel-close');
        spanClose.onclick = () => {
            imageViewer.style.display = "none";
            $('body').css('overflow-y', 'visible');
        }
    });

    $comments.append($node);
}

function waitToLoad() {
    $('.loader').fadeOut('slow', () => {});
    $('.success').fadeIn('slow', () => {});
    setTimeout(() => {
        $('.preloader').fadeOut('slow', () => {});
    }, 750);
    setTimeout(() => {
        $('.preloader').css('opacity', '1');
        $('.loader').show();
        $('.success').hide();
    }, 1500);
}

module.exports = initializeSendForm;