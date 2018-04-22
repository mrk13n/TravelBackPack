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
  var auth = false;
  var username;
  if (req.session.username) {
      auth = true;
      username = req.session.username;
  }
  res.send({
      login: auth,
      user: username
  });
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

    //Видалення усіх коментарів
    // Comments.remove(function (err, comments) {
    //     console.log("comments removed")
    // });
};

exports.login = function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  password = sha1(password + username);

  Users.findOne(
      {
          username: username
      },
      function (err, user) {
          if (user) {
              var checkPassword = password === user.password;
              if (checkPassword) {
                  req.session.username = username;
                  req.session.password = password;
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

  //Видалення усіх користувачів
  // Users.remove(function (err, users) {
  //     console.log("users removed")
  // });
};

exports.registration = function (req, res) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    password = sha1(password + username);

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
                req.session.password = password;
                var newUser = new Users({
                    username: username,
                    email: email,
                    password: password
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