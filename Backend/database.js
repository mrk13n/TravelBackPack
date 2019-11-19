const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/TravelBackPack');
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error', function (err) {
    console.log('connection error:', err.message);
});
db.once('open', function () {
    console.log("Connected to DB!");
});

const one_comment = new mongoose.Schema({
    nickname: {type: String, required: true},
    comment: {type: String, required: true},
    location_name:{type:String, required: true},
    location:{type:String},
    year: {type: String},
    day: {type: String},
    month: {type: String},
    type: {type: String},
    avatar: {type: String},
    count: {type: Number},
    img_1: {type: String},
    img_2: {type: String},
    users_liked: []
});

const comments = new mongoose.Schema({
    city: {type: String, unique: true, required: true},
    comments: [one_comment]
});

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    avatar: {type: String},
    backpack: []
});

const Comments = mongoose.model('comments', comments);
const One_Comment = mongoose.model('one_comment', one_comment);
const Users = mongoose.model('users', userSchema);

exports.Comments = Comments;
exports.One_Comment = One_Comment;
exports.Users = Users;