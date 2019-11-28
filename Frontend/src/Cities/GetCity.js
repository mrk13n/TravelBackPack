const API = require('../API');
const Storage = require('../LocalStorage');
const id = Storage.get('id');

async function getCity() {
    let city;
    await API.getCitiesList(function (err, data) {
        if (err) throw new Error(err);
        for (let i = 0; i < data.length; i++) {
            if (id === data[i].id) {
                city = data[i];
                break;
            }
        }
        if (city === undefined) city = data[randomCity(data)];
    });
    return city;
}

function randomCity(cities) {
    return Math.floor((Math.random() * cities.length));
}

module.exports = getCity;