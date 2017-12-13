exports.mainPage = function(req, res) {
    res.render('mainPage', {
        pageTitle: 'BackPack',
        mainActive: true,
        mapActive: false,
        cityActive: false,
        backpackActive:false
    });
};

exports.cityPage = function (req, res) {
    res.render('cityPage', {
        pageTitle: 'City',
        mainActive: false,
        mapActive: false,
        cityActive: true,
        backpackActive:false
    })
};

exports.backpackPage = function (req, res) {
    res.render('backpackPage', {
        pageTitle: 'Your backpacks',
        mainActive: false,
        mapActive: false,
        cityActive: false,
        backpackActive:true
    })
};