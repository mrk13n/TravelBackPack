const API = require('../API');
const Templates = require('../Teamplates');
const Storage = require('../LocalStorage');
const $cities = $('#city-favourite-comments-container');
const imageViewer = document.getElementById('fs-img-panel');
const largeImg = document.getElementById("fs-img-block");
const captionText = document.getElementById("fs-img-caption");

function showFavouriteCities(list) {
    $cities.html('');

    function showOneCity(oneBackpack) {
        const html_code = Templates.FavouriteCityComments({city: oneBackpack});
        const $node = $(html_code);

        $node.find('.city-backpack-card').click(async function () {
            $(this).addClass('zoomOut');
            $('.preloader').css('opacity', '0.75').fadeIn('slow', function () {});
            $('.city-backpack-card').css('visibility', 'hidden');

            await initializeComments(oneBackpack);
            $cities.addClass('animated fadeInDown');
            waitToLoad();
            $cities.fadeIn();
        });

        $cities.append($node);
    }

    list.forEach(showOneCity);
}

async function initializeComments(oneBackpack) {
    $cities.html("");

    function showOneComment(oneComment) {
        let comment = {
            city: oneBackpack.city,
            favorite: true,
            comment: oneComment
        };
        const html_code = Templates.Comment_OneItem({comment: comment});
        const $node = $(html_code);

        $node.find('.favourite-btn').hover(() => {
            $node.find('.favourite-btn').css('cursor', 'pointer');
        });

        $node.find('.favourite-btn').click(async () => {
            const newBackpack = {
                comment: comment.comment,
                city: comment.city,
                add: false
            };
            $('.preloader').css('opacity', '0.75').fadeIn('slow', () => {});
            await API.setBackpack(newBackpack, (err, data) => {
                if (err) throw new Error(err);
                data.backpack.forEach(oneItem => {
                    if (oneItem.city === comment.city) oneBackpack = oneItem;
                });
            });
            initializeComments(oneBackpack);
            waitToLoad();
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

        $cities.append($node);
    }

    oneBackpack.comments.forEach(showOneComment);
}

async function initializeFavorites() {
    await API.getBackpack((err, data) => {
        if (err) throw new Error(err);
        if (!data.auth) {
            //Authorize to save comments to backpack
        } else {
            if (data.backpack.length !== 0) {
                showFavouriteCities(data.backpack);
            } else {
                //your backpack is empty
            }
        }
    });
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

module.exports = initializeFavorites;