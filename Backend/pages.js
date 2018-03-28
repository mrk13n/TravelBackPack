exports.mainPage = function(req, res) {
    res.render('mainPage', {
        pageTitle: 'TravelHack',
        mainActive: true,
        mapActive: false,
        cityActive: false,
        backpackActive: false,
        aboutActive: false
    });
};

exports.cityPage = function (req, res) {
    res.render('cityPage', {
        pageTitle: 'City',
        mainActive: false,
        mapActive: false,
        cityActive: true,
        backpackActive: false,
        aboutActive: false
    })
};

exports.backpackPage = function (req, res) {
    res.render('backpackPage', {
        pageTitle: 'Your backpacks',
        mainActive: false,
        mapActive: false,
        cityActive: false,
        backpackActive: true,
        aboutActive: false
    })
};

exports.aboutUs = function (req, res) {
    res.render('aboutPage', {
        pageTitle: 'About us',
        mainActive: false,
        mapActive: false,
        cityActive: false,
        backpackActive: false,
        aboutActive: true
    })
};