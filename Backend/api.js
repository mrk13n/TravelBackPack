var Cities = require('./data/Cities');
var db = require('./database');
var Comments = db.Comments;
var One_Comment = db.One_Comment;

exports.getCities = function(req, res) {
    res.send(Cities);
};

exports.writeComment = function (req, res) {
    var nickname = req.body.nickname;
    var comment = req.body.comment;
    var city = req.body.city;
    var current_comment;

    Comments.findOne(
        {
            city: city
        },
        function (err, current_city) {
            if (current_city) {
                current_comment = new One_Comment({
                    nickname: nickname,
                    comment: comment
                });
                var a = current_city.comments;
                a.push(current_comment);
                Comments.update(
                    {
                        city: city
                    },
                    {
                        comments: a
                    },
                    function () {}
                );
                res.send({
                    success: true
                });
            } else {
                current_comment = new One_Comment({
                    nickname: nickname,
                    comment: comment
                });

                var newCity = new Comments({
                    city: city,
                    comments: [current_comment]
                });

                newCity.save(function (err) {
                   if (!err) {
                       res.send({
                           success: true
                       });
                   }
                });
            }
        }
    );
};

exports.getComment = function (req, res) {
    var city = req.body.city;
    var comments = [];

    Comments.findOne(
        {
            city: city
        },
        function (err, curent_city) {
            if (curent_city) {
                comments = curent_city.comments;
                res.send(comments);
            } else {
                res.send({
                    emptyForm: true
                });
            }
        }
    );

    // Comments.remove(function (err, comments) {
    //     console.log("removed")
    // });
};