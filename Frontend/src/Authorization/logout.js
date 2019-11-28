const API = require('../API');

async function logout(page) {
    await API.logout(function (err, data) {
        if (err) throw new Error(err);
        if (data.end) {
            switch (page) {
                case 'home':
                    document.location.href = '/';
                    break;
                case 'city':
                    document.location.href = '/city';
                    break;
                case 'backpack':
                    document.location.href = '/backpack';
                    break;
                case 'about':
                    document.location.href = '/about';
                    break;
            }
        }
    });
}

module.exports = logout;