var fs = require('fs');
var ejs = require('ejs');


exports.City_OneItem = ejs.compile(fs.readFileSync('./Frontend/templates/City_OneItem.ejs', "utf8"));