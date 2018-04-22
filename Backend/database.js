var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/DataBase');
mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on('error', function (err) {
    console.log('connection error:', err.message);
});
db.once('open', function callback () {
    console.log("Connected to DB!");
});

var one_comment = new mongoose.Schema({
    nickname: {type: String},
    comment: {type: String},
    location:{type:String},
    year: {type: String},
    day: {type: String},
    month: {type: String},
    type: {type: String},
    avatar: {type: String},
    count: {type: Number},
    img_1:{type: String},
    img_2:{type: String}
});

var comments = new mongoose.Schema({
    city: {type: String, unique: true},
    comments: [one_comment]
});

var Comments = mongoose.model('comments', comments);
var One_Comment = mongoose.model('one_comment', one_comment);

exports.Comments = Comments;
exports.One_Comment = One_Comment;