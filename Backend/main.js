var express = require('express');
var path = require('path');
var morgan = require('morgan');
var multer = require('multer');
var bodyParser = require('body-parser');
var session = require('express-session');
var upload = require('express-fileupload');
var uploadedImgArray = [];
var imgURI;


// var storage = multer.diskStorage({
//     destination: 'Frontend/www/assets/images/uploaded_images',
//     filename: function (req, file, callback) {
//         imgURI = file.fieldname + "_" + Date.now() + "_" + file.originalname;
//         callback(null, imgURI);
//     }
// });
//
// var upload = multer({
//     storage: storage
// });

function configureEndpoints(app) {
    var pages = require('./pages');
    var api = require('./api');

    app.post('/api/get-comments/', api.getComment);
    app.post('/api/write-comments/', api.writeComment);
    app.post('/api/login/', api.login);
    app.post('/api/registration/', api.registration);
    app.post('/api/set-backpack', api.setBackpack);
    app.get('/api/get-cities/', api.getCities);
    app.get('/api/logout/', api.logout);
    app.get('/api/check-login/', api.checkLogin);
    app.get('/api/get-backpack/', api.getBackpack);

    app.get('/', pages.mainPage);
    app.get('/city.html', pages.cityPage);
    app.get('/backpack.html',pages.backpackPage);
    app.get('/about.html', pages.aboutUs);

    app.use(express.static(path.join(__dirname, '../Frontend/www')));
}

function startServer(port) {
    var app = express();

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    app.use(morgan('dev'));

    app.use(bodyParser.json({limit: '60mb'}));
    app.use(bodyParser.urlencoded({ extended: false}));

    app.use(session({
        secret: "DreamTeam"
    }));
    app.use(upload());

    configureEndpoints(app);

    app.listen(port, function () {
        console.log('My Application Running on http://localhost:'+port+'/');
    });
}

exports.startServer = startServer;