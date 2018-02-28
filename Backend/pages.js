exports.mainPage = function(req, res) {
    res.render('mainPage', {
        pageTitle: 'TravelHack',
        less: 'main',
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
        less: 'city',
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
        less: 'backpack',
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
        less: 'about',
        mainActive: false,
        mapActive: false,
        cityActive: false,
        backpackActive: false,
        aboutActive: true
    })
};