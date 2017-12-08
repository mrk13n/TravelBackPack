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

var comments = new mongoose.Schema({
    city: {type: String, unique: true},
    comments: [{nickname: {type: String}, comment: {type: String}}]
});

var Comments = mongoose.model('comments', comments);

module.exports = Comments;