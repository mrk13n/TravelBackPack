var Cities;
var API = require('../API');
var Storage = require('../LocalStorage');
var trash = ['a', 'able', 'about', 'above', 'abroad', 'according', 'accordingly',
    'across',
    'actually',
    'adj', 'after',
    'afterwards',
    'again',
    'against',
    'ago',
    'ahead',
    'aint',
    'all',
    'allow',
    'allows',
    'almost',
    'alone',
    'along',
    'alongside',
    'already',
    'also',
    'although',
    'always',
    'am',
    'amid',
    'amidst',
    'among',
    'amongst',
    'an',
    'and',
    'another',
    'any',
    'anybody',
    'anyhow',
    'anyone',
    'anything',
    'anyway',
    'anyways',
    'anywhere',
    'apart',
    'appear',
    'appreciate',
    'appropriate',
    'are',
    'arent',
    'around',
    'as',
    'as',
    'aside',
    'ask',
    'asking',
    'associated',
    'at',
    'available',
    'away',
    'awfully',
    'b',
    'back',
    'backward',
    'backwards',
    'be',
    'became',
    'because',
    'become',
    'becomes',
    'becoming',
    'been',
    'before',
    'beforehand',
    'begin',
    'behind',
    'being',
    'believe',
    'below',
    'beside',
    'besides',
    'best',
    'better',
    'between',
    'beyond',
    'both',
    'brief',
    'but',
    'by',
    'c',
    'came',
    'can',
    'cannot',
    'cant',
    'cant',
    'caption',
    'cause',
    'causes',
    'certain',
    'certainly',
    'changes',
    'clearly',
    'cmon',
    'co',
    'co.',
    'com',
    'come',
    'comes',
    'concerning',
    'consequently',
    'consider',
    'considering',
    'contain',
    'containing',
    'contains',
    'corresponding',
    'could',
    'couldnt',
    'course',
    'cs',
    'currently',
    'd',
    'dare',
    'darent',
    'definitely',
    'described',
    'despite',
    'did',
    'didnt',
    'different',
    'directly',
    'do',
    'does',
    'doesnt',
    'doing',
    'done',
    'dont',
    'down',
    'downwards',
    'during',
    'e',
    'each',
    'edu',
    'eg',
    'eight',
    'eighty',
    'either',
    'else',
    'elsewhere',
    'end',
    'ending',
    'enough',
    'entirely',
    'especially',
    'et',
    'etc',
    'even',
    'ever',
    'evermore',
    'every',
    'everybody',
    'everyone',
    'everything',
    'everywhere',
    'ex',
    'exactly',
    'example',
    'except',
    'f',
    'fairly',
    'far',
    'farther',
    'few',
    'fewer',
    'fifth',
    'first',
    'five',
    'followed',
    'following',
    'follows',
    'for',
    'forever',
    'former',
    'formerly',
    'forth',
    'forward',
    'found',
    'four',
    'from',
    'further',
    'furthermore',
    'g',
    'get',
    'gets',
    'getting',
    'given',
    'gives',
    'go',
    'goes',
    'going',
    'gone',
    'got',
    'gotten',
    'greetings',
    'h',
    'had',
    'hadnt',
    'half',
    'happens',
    'hardly',
    'has',
    'hasnt',
    'have',
    'havent',
    'having',
    'he',
    'hed',
    'hell',
    'hello',
    'help',
    'hence',
    'her',
    'here',
    'hereafter',
    'hereby',
    'herein',
    'heres',
    'hereupon',
    'hers',
    'herself',
    'hes',
    'hi',
    'him',
    'himself',
    'his',
    'hither',
    'hopefully',
    'how',
    'howbeit',
    'however',
    'hundred',
    'i',
    'id',
    'ie',
    'if',
    'ignored',
    'ill',
    'im',
    'immediate',
    'in',
    'inasmuch',
    'inc',
    'inc.',
    'indeed',
    'indicate',
    'indicated',
    'indicates',
    'inner',
    'inside',
    'insofar',
    'instead',
    'into',
    'inward',
    'is',
    'isnt',
    'it',
    'itd',
    'itll',
    'its',
    'its',
    'itself',
    'ive',
    'j',
    'just',
    'k',
    'keep',
    'keeps',
    'kept',
    'know',
    'known',
    'knows',
    'l',
    'last',
    'lately',
    'later',
    'latter',
    'latterly',
    'least',
    'less',
    'lest',
    'let',
    'lets',
    'like',
    'liked',
    'likely',
    'likewise',
    'little',
    'look',
    'looking',
    'looks',
    'low',
    'lower',
    'ltd',
    'm',
    'made',
    'mainly',
    'make',
    'makes',
    'many',
    'may',
    'maybe',
    'maynt',
    'me',
    'mean',
    'meantime',
    'meanwhile',
    'merely',
    'might',
    'mightnt',
    'mine',
    'minus',
    'miss',
    'more',
    'moreover',
    'most',
    'mostly',
    'mr',
    'mrs',
    'much',
    'must',
    'mustnt',
    'my',
    'myself',
    'n',
    'name',
    'namely',
    'nd',
    'near',
    'nearly',
    'necessary',
    'need',
    'neednt',
    'needs',
    'neither',
    'never',
    'neverf',
    'neverless',
    'nevertheless',
    'new',
    'next',
    'nine',
    'ninety',
    'no',
    'nobody',
    'non',
    'none',
    'nonetheless',
    'noone',
    'no-one',
    'nor',
    'normally',
    'not',
    'nothing',
    'notwithstanding',
    'novel',
    'now',
    'nowhere',
    'o',
    'obviously',
    'of',
    'off',
    'often',
    'oh',
    'ok',
    'okay',
    'old',
    'on',
    'once',
    'one',
    'ones',
    'ones',
    'only',
    'onto',
    'opposite',
    'or',
    'other',
    'others',
    'otherwise',
    'ought',
    'oughtnt',
    'our',
    'ours',
    'ourselves',
    'out',
    'outside',
    'over',
    'overall',
    'own',
    'p',
    'particular',
    'particularly',
    'past',
    'per',
    'perhaps',
    'placed',
    'please',
    'plus',
    'possible',
    'presumably',
    'probably',
    'provided',
    'provides',
    'q',
    'que',
    'quite',
    'qv',
    'r',
    'rather',
    'rd',
    're',
    'really',
    'reasonably',
    'recent',
    'recently',
    'regarding',
    'regardless',
    'regards',
    'relatively',
    'respectively',
    'right',
    'round',
    's',
    'said',
    'same',
    'saw',
    'say',
    'saying',
    'says',
    'second',
    'secondly',
    'see',
    'seeing',
    'seem',
    'seemed',
    'seeming',
    'seems',
    'seen',
    'self',
    'selves',
    'sensible',
    'sent',
    'serious',
    'seriously',
    'seven',
    'several',
    'shall',
    'shant',
    'she',
    'shed',
    'shell',
    'shes',
    'should',
    'shouldnt',
    'since',
    'six',
    'so',
    'some',
    'somebody',
    'someday',
    'somehow',
    'someone',
    'something',
    'sometime',
    'sometimes',
    'somewhat',
    'somewhere',
    'soon',
    'sorry',
    'specified',
    'specify',
    'specifying',
    'still',
    'sub',
    'such',
    'sup',
    'sure',
    't',
    'take',
    'taken',
    'taking',
    'tell',
    'tends',
    'th',
    'than',
    'thank',
    'thanks',
    'thanx',
    'that',
    'thatll',
    'thats',
    'thats',
    'thatve',
    'the',
    'their',
    'theirs',
    'them',
    'themselves',
    'then',
    'thence',
    'there',
    'thereafter',
    'thereby',
    'thered',
    'therefore',
    'therein',
    'therell',
    'therere',
    'theres',
    'theres',
    'thereupon',
    'thereve',
    'these',
    'they',
    'theyd',
    'theyll',
    'theyre',
    'theyve',
    'thing',
    'things',
    'think',
    'third',
    'thirty',
    'this',
    'thorough',
    'thoroughly',
    'those',
    'though',
    'three',
    'through',
    'throughout',
    'thru',
    'thus',
    'till',
    'to',
    'together',
    'too',
    'took',
    'toward',
    'towards',
    'tried',
    'tries',
    'truly',
    'try',
    'trying',
    'ts',
    'twice',
    'two',
    'u',
    'un',
    'under',
    'underneath',
    'undoing',
    'unfortunately',
    'unless',
    'unlike',
    'unlikely',
    'until',
    'unto',
    'up',
    'upon',
    'upwards',
    'us',
    'use',
    'used',
    'useful',
    'uses',
    'using',
    'usually',
    'v',
    'value',
    'various',
    'versus',
    'very',
    'via',
    'viz',
    'vs',
    'w',
    'want',
    'wants',
    'was',
    'wasnt',
    'way',
    'we',
    'wed',
    'welcome',
    'well',
    'well',
    'went',
    'were',
    'were',
    'werent',
    'weve',
    'what',
    'whatever',
    'whatll',
    'whats',
    'whatve',
    'when',
    'whence',
    'whenever',
    'where',
    'whereafter',
    'whereas',
    'whereby',
    'wherein',
    'wheres',
    'whereupon',
    'wherever',
    'whether',
    'which',
    'whichever',
    'while',
    'whilst',
    'whither',
    'who',
    'whod',
    'whoever',
    'whole',
    'wholl',
    'whom',
    'whomever',
    'whos',
    'whose',
    'why',
    'will',
    'willing',
    'wish',
    'with',
    'within',
    'without',
    'wonder',
    'wont',
    'would',
    'wouldnt',
    'x',
    'y',
    'yes',
    'yet',
    'you',
    'youd',
    'youll',
    'your',
    'youre',
    'yours',
    'yourself',
    'yourselves',
    'youve',
    'z',
    'zero'
]
var cities = ['paris','barcelona','budapest','amsterdam','london','berlin'];

function getId(text) {
    var city_name;
    var city_search;
    var find = false;
    var id;
    var search_words = [];
    var n = 0;
    search_words = cleanText(text);
    API.getCitiesList(function (err, data) {
        if (!err) {
            Cities = data;
            for(var i = 0;i < search_words.length;i++) {
                for (var j = 0; j < Cities.length; j++) {
                    if (search_words[i] === Cities[j].city.toLowerCase()) {
                        city_name = Cities[j];
                        search_words[i] = "";
                        break;
                    }
                }
            }
            city_search = {city: city_name.city};
            API.getComments(city_search, function (err, data) {
                if (!err) {
                    var gt = true;
                    var word_gt = false;
                    for (i = 0; i < data.length; i++) {
                        var comment_words = cleanText(data[i].comment);
                        console.log(comment_words);
                        for (var j = 0; j < search_words.length; j++){
                            for (var k = 0; k < comment_words.length; k++){
                                if (search_words[j] === comment_words[k]){
                                    word_gt = true;
                                    break;
                                }
                            }
                            if (!word_gt){
                                gt = false;
                                break;
                            }
                            word_gt = false;
                        }
                        if(gt){
                            console.log(data[i].comment)
                        }
                        gt = true;
                        word_gt = false;
                    }
                }
            });
        }
    });


    // API.getCitiesList(function (err, data) {
    //     if (!err) {
    //         Cities = data;
    //         for (var i = 0; i < Cities.length; i++) {
    //             if (text !== undefined) {
    //                 nameCity = Cities[i].city_name.toLowerCase();
    //                 if (text === nameCity) {
    //                     id = Cities[i].id;
    //                     Storage.set('id', id);
    //                     document.location.href = '/city_name.html';
    //                     find = true;
    //                 }
    //             }
    //         }
    //         if (!find) {
    //             for (var j = 0; j < Cities.length; j++) {
    //                 if (text !== undefined) {
    //                     text = text.toLowerCase();
    //                     var a = text.length;
    //                     var name = '';
    //                     nameCity = Cities[j].city_name.toLowerCase();
    //                     for (var k = 0; k < a; k++) {
    //                         name += nameCity[k];
    //                     }
    //                     if (text === name) {
    //                         id = Cities[j].id;
    //                         Storage.set('id', id);
    //                         document.location.href = '/city_name.html';
    //                         find = true;
    //                     }
    //                 }
    //             }
    //         }
    //         if (!find) {
    //             $('.search-box').addClass('has-error');
    //         }
    //     }
    // });
}

function cleanText(text) {
    var one = '';
    var words = [];
    text = text.toLowerCase();
    for (var i = 0; i < text.length; i++) {
        if (text[i] !== ' ' &&  text[i] !== ',' && text[i] !== '.' && text[i] !== '!' && text[i] !== ';' && text[i] !== ':' && text[i] !== '?' && text[i] !== '`' && text[i] !== '<' && text[i] !== '>' && text[i] !== '/' && text[i] !== '"' && text[i] !== '\'' && text[i] !== '\\' && text[i] !== ']' && text[i] !== '[' && text[i] !== '}' && text[i] !== '{' && text[i] !== '=' && text[i] !== '+' && text[i] !== '-' && text[i] !== '_' && text[i] !== ')' && text[i] !== '(' && text[i] !== '*' && text[i] !== '&' && text[i] !== '^' && text[i] !== '%' && text[i] !== '$' && text[i] !== '#' && text[i] !== '№' && text[i] !== '@' && text[i] !== '`' && text[i] !== '~' && text[i] !== '1' && text[i] !== '2' && text[i] !== '3' && text[i] !== '4' && text[i] !== '5' && text[i] !== '6' && text[i] !== '7' && text[i] !== '8' && text[i] !== '9' && text[i] !== '0') {
            one += text[i];
        } else {
            if (one !== '' && !trash.includes(one) && one.length!=1) {
                words.push(one);
            }
            one = '';
        }
    }
    words.push(one);
    return words;
}

exports.getId = getId;