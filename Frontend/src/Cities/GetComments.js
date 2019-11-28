const API = require('../API');
const Templates = require('../Teamplates');
const imageViewer = document.getElementById('fs-img-panel');
const largeImg = document.getElementById("fs-img-block");
const captionText = document.getElementById("fs-img-caption");
const $comments = $("#comments");
let allComments = [];
let backpack = [];

function showComments(list) {
    $comments.html('');

    function showOneComment(comment) {
        const html_code = Templates.Comment_OneItem({ comment: comment });
        const $node = $(html_code);

        $node.find('.favourite-btn').hover(() => {
           if (!backpack.auth) {
               $node.find('.favourite-btn').css('cursor', 'not-allowed');
           } else {
               $node.find('.favourite-btn').css('cursor', 'pointer');
           }
        });

        $node.find('.favourite-btn').click(async () => {
            if (backpack.auth) {
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

    list.forEach(showOneComment);
}

async function initializeComments(type, city) {
    let currentCity = { city: city.city, type: type };
    let comments = [];

    await API.getBackpack((err, data) => {
        if (err) throw new Error(err);
        backpack = data;
    });

    await API.getComments(currentCity, (err, data) => {
        if (err) throw new Error(err);
        allComments = data;
    });

    allComments.forEach(oneComment => {
        let oneItem;
        let fav = false;
        if (backpack.auth) {
            backpack.backpack.forEach(oneBackpackItem => {
                if (oneBackpackItem.city === currentCity.city) {
                    oneBackpackItem.comments.forEach(oneBackpackItemComment => {
                        if (oneComment._id === oneBackpackItemComment._id) {
                            fav = true;
                        }
                    });
                }
            });

        }
        oneItem = {
            city: currentCity.city,
            favorite: fav,
            comment: oneComment
        };
        comments.push(oneItem);
    });

    showComments(comments);
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

module.exports = initializeComments;