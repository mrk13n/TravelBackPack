var Cities = require('./data/Cities');
var Comments = require('./database');

exports.getCities = function(req, res) {
    res.send(Cities);
};

exports.writeComment = function (req, res) {
    var nickname = req.body.nickname;
    var comment = req.body.comment;
    var city = req.body.city;

    var newComment = new Comments({
        city: city,
        comments: {
            nickname: nickname,
            comment: comment
        }
    });

    newComment.save(function (err) {
        if (!err) {
            res.send({
                success: true
            });
        }
    });
};

exports.getComment = function (req, res) {
    var city = req.body.city;
    var comments = [];
    Comments.findOne(
        {
            city: city
        },
        function (err, comment) {
            for (var i = 0; i < comment.length; i++)
            {
                comments.unshift(comment[i]);
            }
            res.send(comments);
        }
    );
};