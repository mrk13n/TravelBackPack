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
    var year = req.body.year;
    var day = req.body.day;
    var month = req.body.month;
    var type = req.body.type;
    var avatar = req.body.avatar;
    var current_comment;

    Comments.findOne(
        {
            city: city
        },
        function (err, current_city) {
            if (current_city) {
                current_comment = new One_Comment({
                    nickname: nickname,
                    comment: comment,
                    year: year,
                    day: day,
                    month: month,
                    type: type,
                    avatar: avatar
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
                res.send(current_comment);
            } else {
                current_comment = new One_Comment({
                    nickname: nickname,
                    comment: comment,
                    year: year,
                    day: day,
                    month: month,
                    type: type,
                    avatar: avatar
                });

                var newCity = new Comments({
                    city: city,
                    comments: [current_comment]
                });

                newCity.save(function (err) {
                   if (!err) {
                       res.send(current_comment);
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