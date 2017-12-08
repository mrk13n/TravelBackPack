var Templates = require('../Teamplates');
var Storage = require('../LocalStorage');
var API = require('../API');
var $comments = $("#comments");
var city = {
    city: Storage.get('city')
};

function showComments() {
    $comments.html("");

    function showOneComment(comment) {
        var html_code = Templates.Comment_OneItem({comment: comment});

        var $node = $(html_code);

        $comments.append($node);
    }

    list.forEach(showOneComment);
}

function initialiseComments() {
    API.getComments(city, function (err, data) {
        if (!err) {
            console.log(data);
        }
    });
}

exports.initialiseComments = initialiseComments;