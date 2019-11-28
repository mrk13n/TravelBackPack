const Cities = require('./data/Cities');
const db = require('./database');
const bcrypt = require('bcrypt');
const saltRounds  = 10;
const Comments = db.Comments;
const OneComment = db.OneComment;
const Users = db.Users;

exports.getCities = (req, res) => {
    res.send(Cities);
};

exports.checkLogin = (req, res) => {
    let auth = false;
    let username;
    if (req.session.username) {
        auth = true;
        username = req.session.username;
    }
    res.send({
        login: auth,
        user: username
    })
};

exports.registration = (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const avatar = req.body.avatar;
    const backpack = [];

    Users.findOne(
        {
            username: username
        },
        (err, user) => {
            if (err) throw new Error(err);
            if (user) {
                res.send({
                    isExist: true
                });
            } else {
                bcrypt.genSalt(saltRounds, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        const newUser = new Users({
                            username: username,
                            email: email,
                            password: hash,
                            avatar: avatar,
                            backpack: backpack
                        });

                        newUser.save((err, user) => {
                            if (err) throw new Error(err);
                            req.session.username = user.username;
                            req.session.avatar = user.avatar;
                            res.send({
                                newUser: true,
                            });
                        });
                    });
                });
            }
        }
    );
};

exports.login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    Users.findOne(
        {
            username: username
        },
        async (err, user) => {
            if (err) throw new Error(err);
            if (user) {
                const checkPassword = await bcrypt.compare(password, user.password);
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

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) throw new Error(err);
        res.send({
            end: true
        });
    });
};

exports.writeComment = (req, res) => {
    const nickname = req.body.nickname;
    const comment = req.body.comment;
    const locationName = req.body.locationName;
    const city = req.body.city;
    const date = req.body.date;
    const type = req.body.type;
    const avatar = req.session.avatar;
    const img = req.body.img;
    let currentComment = new OneComment({
        nickname: nickname,
        comment: comment,
        locationName: locationName,
        date: date,
        type: type,
        avatar: avatar,
        img: img,
        likes: []
    });

    Comments.findOne(
        {
            city: city
        },
        (err, current_city) => {
            if (current_city) {
                let comments = current_city.comments;
                comments.push(currentComment);
                Comments.update(
                    {
                        city: city
                    },
                    {
                        comments: comments
                    },
                    (err) => {
                        if (err) throw new Error(err);
                        res.send(currentComment);
                    }
                );
            } else {
                const newCity = new Comments({
                    city: city,
                    comments: [currentComment]
                });

                newCity.save((err) => {
                    if (err) throw new Error(err);
                    res.send(currentComment);
                });
            }
        }
    );
};

exports.getComments = (req, res) => {
    const city = req.body.city;
    const type = req.body.type;
    let comments = [];

    Comments.findOne(
        {
            city: city
        },
        (err, current_city) => {
            if (err) throw new Error(err);
            if (current_city) {
                comments = current_city.comments.filter(oneComment => oneComment.type === type);
            }
            res.send(comments);
        }
    );
};

exports.getBackpack = (req, res) => {
    const username = req.session.username;
    let backpack = [];
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
            (err, user) => {
                if (err) throw new Error(err);
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

exports.setBackpack = (req, res) => {
    const username = req.session.username;
    const likedComment = req.body.comment;
    const city = req.body.city;
    const add = req.body.add;
    let userId;
    let backpack = [];
    let newBackpack = [];
    let newComments = [];
    let backpackComments = [];
    let comments = [];

    Users.findOne(
        {
            username: username
        },
        (err, user) => {
            if (err) throw new Error(err);
            if (!user) {
                res.send({
                    auth: false,
                    backpack: newBackpack
                });
            }
            backpack = user.backpack;
            userId = user._id.toString();
            if (add) {
                backpack.forEach(oneBackpack => {
                    if (oneBackpack.city === city) {
                        backpackComments = oneBackpack.comments;
                    }
                });
                if (backpackComments.length === 0) {
                    backpackComments.push(likedComment);
                    let oneItem = {
                        city: city,
                        comments: backpackComments
                    };
                    backpack.push(oneItem);
                    newBackpack = backpack;
                } else {
                    newBackpack = backpack.map(oneBackpack => {
                        if (oneBackpack.city === city) {
                            oneBackpack.comments.push(likedComment);
                        }
                        return oneBackpack;
                    });
                }
                Comments.findOne(
                    {
                        city: city
                    },
                    (err, current_city) => {
                        if (err) throw new Error(err);
                        comments = current_city.comments;
                        newComments = comments.map(oneComment => {
                            if (oneComment._id == likedComment._id) {
                                let find = false;
                                oneComment.likes.forEach(oneLike => {
                                    if (oneLike === userId) find = true;
                                });
                                if (!find) {
                                    oneComment.likes.push(userId);
                                }
                            }
                            return oneComment;
                        });

                        Comments.update(
                            {
                                city: city
                            },
                            {
                                comments: newComments
                            },
                            (err) => {
                                if (err) throw new Error(err);
                            }
                        );
                    }
                );
            } else {
                backpack.forEach(oneBackpack => {
                    if (oneBackpack.city === city) {
                        oneBackpack.comments = oneBackpack.comments.filter(
                            oneBackpackComment => oneBackpackComment._id != likedComment._id
                        );
                    }
                });
                newBackpack = backpack.filter(oneBackpack => oneBackpack.comments.length !== 0);
            }
            Users.update(
                {
                    username: username
                },
                {
                    backpack: newBackpack
                },
                (err) => {
                    if (err) throw new Error(err);
                    res.send({
                        auth: true,
                        backpack: newBackpack
                    });
                }
            );
        }
    );
};