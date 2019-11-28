const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/TravelBackPack');
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error', function (err) {
    throw new Error(err);
});
db.once('open', function () {
    console.log("Connected to DB!");
});

const oneComment = new mongoose.Schema({
    nickname: { type: String, required: true },
    comment: { type: String, required: true },
    locationName: { type:String, required: true },
    date: { type: String, required: true},
    type: { type: String },
    avatar: { type: String },
    img: [],
    likes: []
});

const comments = new mongoose.Schema({
    city: { type: String, unique: true, required: true },
    comments: [oneComment]
});

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    avatar: { type: String },
    backpack: [comments]
});

const Comments = mongoose.model('comments', comments);
const OneComment = mongoose.model('one_comment', oneComment);
const Users = mongoose.model('users', userSchema);

exports.Comments = Comments;
exports.OneComment = OneComment;
exports.Users = Users;