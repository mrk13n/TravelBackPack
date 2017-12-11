exports.mainPage = function(req, res) {
    res.render('mainPage', {
        pageTitle: 'BackPack',
        mainActive: true,
        mapActive: false,
        cityActive: false
    });
};

exports.mapPage = function(req, res) {
    res.render('map', {
        pageTitle: 'Map',
        mainActive: false,
        mapActive: true,
        cityActive: false
    })
};

exports.cityPage = function (req, res) {
    res.render('cityPage', {
        pageTitle: 'City',
        mainActive: false,
        mapActive: false,
        cityActive: true
    })
};