var Cities;
var API = require('../API');
var Storage = require('../LocalStorage');
var trash = ["the","of","and","a","to","in","is","you","that","it","he","was","for","on","are","as","with","his","they","i","at","be","this","have","from","or","one","had","by","word","but","not","what","all","were","we","when","your","can","said","there","use","an","each","which","she","do","how","their","if","will","up","other","about","out","many","then","them","these","so","some","her","would","make","like","him","into","time","has","look","two","more","write","go","see","number","no","way","could","people","my","than","first","been","call","who","its","now","find","long","down","day","did","get","come","made","may","part" , "want" , "best" , "where" , "can"];

function getId(text) {
    var one = '';
    var words = [];
    var nameCity;
    var find = false;
    var id;
    text = text.toLowerCase();
    //create array with all words
    for (var i = 0; i < text.length; i++) {
        if (text[i] !== ' ' && text[i] !== ',' && text[i] !== '.' && text[i] !== '!' && text[i] !== ';' && text[i] !== ':' && text[i] !== '?' && text[i] !== '`' && text[i] !== '<' && text[i] !== '>' && text[i] !== '/' && text[i] !== '"' && text[i] !== '\'' && text[i] !== '\\' && text[i] !== ']' && text[i] !== '[' && text[i] !== '}' && text[i] !== '{' && text[i] !== '=' && text[i] !== '+' && text[i] !== '-' && text[i] !== '_' && text[i] !== ')' && text[i] !== '(' && text[i] !== '*' && text[i] !== '&' && text[i] !== '^' && text[i] !== '%' && text[i] !== '$' && text[i] !== '#' && text[i] !== '№' && text[i] !== '@' && text[i] !== '`' && text[i] !== '~' && text[i] !== '1' && text[i] !== '2' && text[i] !== '3' && text[i] !== '4' && text[i] !== '5' && text[i] !== '6' && text[i] !== '7' && text[i] !== '8' && text[i] !== '9' && text[i] !== '0') {
            one += text[i];
        } else {
            if (one !== '') {
                words.push(one);
                one = '';
            }
        }
    }
    words.push(one);
    //delete trash words
    find_words = deleteTrash(words);
    console.log(words);
    //try to find just city
    API.getCitiesList(function (err, data) {
        if (!err) {
            Cities = data;
            for (var i = 0; i < Cities.length; i++) {
                if (text !== undefined) {
                    nameCity = Cities[i].city.toLowerCase();
                    if (text === nameCity) {
                        id = Cities[i].id;
                        Storage.set('id', id);
                        document.location.href = '/city.html';
                        find = true;
                    }
                }
            }
            if (!find) {
                for (var j = 0; j < Cities.length; j++) {
                    if (text !== undefined) {
                        text = text.toLowerCase();
                        var a = text.length;
                        var name = '';
                        nameCity = Cities[j].city.toLowerCase();
                        for (var k = 0; k < a; k++) {
                            name += nameCity[k];
                        }
                        if (text === name) {
                            id = Cities[j].id;
                            Storage.set('id', id);
                            document.location.href = '/city.html';
                            find = true;
                        }
                    }
                }
            }
            if (!find) {
                $('.search-box').addClass('has-error');
            }
        }
    });
}

function deleteTrash(all_words){
    for (var i = 0; i < all_words.length; i++) {
        if (trash.includes(all_words[i])){
            all_words.splice(i,1);
        }
    }
    return all_words;
}

exports.getId = getId;