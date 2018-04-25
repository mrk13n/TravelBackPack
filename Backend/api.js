var Cities = require('./data/Cities');
var db = require('./database');
var crypto = require('crypto');
var Comments = db.Comments;
var One_Comment = db.One_Comment;
var Users = db.Users;


function sha1(string) {
    var sha1 = crypto.createHash('sha1');
    sha1.update(string);
    return sha1.digest('base64');
}

exports.getCities = function(req, res) {
    res.send(Cities);
};

exports.checkLogin = function (req, res) {
    //ВИдалення усіх користувачів
    //  Users.remove(function (err, users) {
    //      console.log("users removed")
    //  });
    var auth = false;
    var username;
    if (req.session.username) {
        auth = true;
        username = req.session.username;
    }
    res.send({
        login: auth,
        user: username
    })
};

exports.writeComment = function (req, res) {
    var nickname = req.body.nickname;
    var comment = req.body.comment;
    var location_name = req.body.location_name;
    var location = req.body.location;
    var city = req.body.city;
    var year = req.body.year;
    var day = req.body.day;
    var month = req.body.month;
    var type = req.body.type;
    var avatar = req.session.avatar;
    var count = req.body.count;
    var img_1 = req.body.img_1;
    var img_2 = req.body.img_2;
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
                    location_name: location_name,
                    location: location,
                    year: year,
                    day: day,
                    month: month,
                    type: type,
                    avatar: avatar,
                    count: count,
                    img_1: img_1,
                    img_2: img_2
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
                    location_name:location_name,
                    location: location,
                    year: year,
                    day: day,
                    month: month,
                    type: type,
                    avatar: avatar,
                    count: count,
                    img_1: img_1,
                    img_2: img_2
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
        function (err, current_city) {
            if (current_city) {
                comments = current_city.comments;
                res.send(comments);
            } else {
                res.send({
                    emptyForm: true
                });
            }
        }
    );

    //Видалення усіх коментарів
    //  Comments.remove(function (err, comments) {
    //      console.log("comments removed")
    //  });
};

exports.login = function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  password = sha1(password);

  Users.findOne(
      {
          username: username
      },
      function (err, user) {
          if (user) {
              var checkPassword = password === user.password;
              if (checkPassword) {
                  req.session.username = user.username;
                  req.session.avatar = user.avatar;
                  res.send({
                      success: true
                  });
              } else {
                  res.send({
                      incorrectPassword: true
                  });
              }
          } else {
              res.send({
                  notFound: true
              });
          }
      }
  );
};

exports.registration = function (req, res) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var avatar = req.body.avatar;
    var backpack = [];
    password = sha1(password);

    Users.findOne(
        {
            username: username
        },
        function (err, user) {
            if (user) {
                res.send({
                    isExist: true
                });
            } else {
                req.session.username = username;
                req.session.avatar = avatar;
                var newUser = new Users({
                    username: username,
                    email: email,
                    password: password,
                    avatar: avatar,
                    backpack: backpack
                });

                newUser.save(function (err) {
                   if (!err) {
                       res.send({
                           newUser: true
                       });
                   }
                });
            }
        }
    );
};

exports.logout = function (req, res) {
  req.session.destroy(function (err) {
      if (err) {
          res.negotiate(err);
      }
      res.send({
          end: true
      });
  });
};

exports.getBackpack = function (req, res) {
    var username = req.session.username;
    var backpack = [];
    if (!username) {
        res.send({
            auth: false,
            backpack: backpack
        });
    } else {
        Users.findOne(
            {
                username: username
            },
            function (err, user) {
                if (user) {
                    backpack = user.backpack;
                    res.send({
                        auth: true,
                        backpack: backpack
                    });
                }
            }
        );
    }
};

exports.setBackpack = function (req, res) {
    var username = req.session.username;
    var backpack = req.body.backpack;
    var add = req.body.add;
    var city = req.body.city;
    var comments = [];
    var liked_comment;
    var liked_users = [];
    var liked;
    Users.findOne(
        {
            username: username
        },
        function (err, user) {
            if (user) {
                if (add) {
                    Comments.findOne(
                        {
                            city: city
                        },
                        function (err, current_city) {
                            if (current_city) {
                                comments = current_city.comments;
                                liked_comment = backpack[backpack.length-1].comment;
                                for (var i = 0; i < comments.length; i++) {
                                    if (comments[i]._id == liked_comment._id) {
                                        liked_users = comments[i].users_liked;
                                        liked = comments[i].count;
                                        var find = false;
                                        for (var j = 0; j < liked_users.length; j++) {
                                            if (liked_users[j] === username) {
                                                find = true;
                                                break;
                                            }
                                        }
                                        var new_comments = comments;
                                        if (!find) {
                                            liked_users.push(username);
                                            liked++;
                                            for (var k = 0; k < new_comments.length; k++) {
                                                if (new_comments[k]._id == liked_comment._id) {
                                                    new_comments[k].users_liked = liked_users;
                                                    new_comments[k].count = liked;
                                                    Comments.update(
                                                        {
                                                            city: city
                                                        },
                                                        {
                                                            comments: new_comments
                                                        },
                                                        function () {}
                                                    );
                                                }
                                            }
                                        }
                                        break;
                                    }
                                }
                            }
                        }
                    );
                }
                Users.update(
                    {
                        username: username
                    },
                    {
                        backpack: backpack
                    },
                    function () {}
                );
                res.send({
                    success: true
                });
            }
        }
    );
};