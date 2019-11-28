const fs = require('fs');
const ejs = require('ejs');


exports.City_OneItem = ejs.compile(fs.readFileSync('./Frontend/templates/City_OneItem.ejs', "utf8"));
exports.Comment_OneItem = ejs.compile(fs.readFileSync('./Frontend/templates/Comment_OneItem.ejs', "utf8"));
exports.InfoCity = ejs.compile(fs.readFileSync('./Frontend/templates/InfoCity.ejs', "utf8"));
exports.SendForm = ejs.compile(fs.readFileSync('./Frontend/templates/SendForm.ejs', "utf8"));
exports.weatherBlock = ejs.compile(fs.readFileSync('./Frontend/templates/weatherBlock.ejs', "utf8"));
exports.additionalInfo = ejs.compile(fs.readFileSync('./Frontend/templates/additionalInfo.ejs', "utf8"));
exports.FavouriteCityComments = ejs.compile(fs.readFileSync('./Frontend/templates/FavouriteCityComments.ejs', "utf8"));
exports.OneFavouriteComment = ejs.compile(fs.readFileSync('./Frontend/templates/OneFavouriteComment.ejs', "utf8"));