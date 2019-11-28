const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const upload = require('express-fileupload');

function configureEndpoints(app) {
    const pages = require('./pages');
    const api = require('./api');

    app.post('/api/get-comments/', api.getComments);
    app.post('/api/write-comments/', api.writeComment);
    app.post('/api/login/', api.login);
    app.post('/api/registration/', api.registration);
    app.post('/api/set-backpack', api.setBackpack);
    app.get('/api/get-cities/', api.getCities);
    app.get('/api/logout/', api.logout);
    app.get('/api/check-login/', api.checkLogin);
    app.get('/api/get-backpack/', api.getBackpack);

    app.get('/', pages.mainPage);
    app.get('/city', pages.cityPage);
    app.get('/backpack',pages.backpackPage);
    app.get('/about', pages.aboutUs);
    app.get('/home', function (req, res) {
        res.redirect('/');
    });

    app.use(express.static(path.join(__dirname, '../Frontend/www')));
}

function startServer(port) {
    const app = express();

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