/**
 * Created by Andriy on 10.03.2015.
 */
module.exports = function(grunt) {
    //Налаштування збірки Grunt
    var config = {
        //Інформацію про проект з файлу package.json
        pkg: grunt.file.readJSON('package.json'),

        //Конфігурація для модуля browserify (перетворює require(..) в код
        browserify:     {
            //Загальні налаштування (grunt-browserify)
            options:      {

                //brfs замість fs.readFileSync вставляє вміст файлу
                transform:  [ require('brfs') ],
                browserifyOptions: {
                    //Папка з корнем джерельних кодів javascript
                    basedir: "Frontend/src/"
                }
            },

            cities: {
                src:        'Frontend/src/main.js',
                dest:       'Frontend/www/assets/js/main.js'
            },
            city: {
                src:        'Frontend/src/city.js',
                dest:       'Frontend/www/assets/js/city.js'
            },
            backpack: {
                src:        'Frontend/src/backpack.js',
                dest:       'Frontend/www/assets/js/backpack.js'
            },
            aboutus: {
                src:        'Frontend/src/aboutus.js',
                dest:       'Frontend/www/assets/js/aboutus.js'
            }
        }
    };

    //Налаштування відстежування змін в проекті
    var watchDebug = {
        options: {
            'no-beep': true
        },
        //Назва завдання будь-яка
        scripts: {
            //На зміни в яких файлах реагувати
            files: ['Frontend/src/**/*.js', 'Frontend/**/*.ejs', 'Frontend/src/*.js'],
            //Які завдання виконувати під час зміни в файлах
            tasks: [
                'browserify:cities',
                'browserify:city',
                'browserify:backpack',
                'browserify:aboutus'
            ]
        }
    };


    //Ініціалузвати Grunt
    config.watch = watchDebug;
    grunt.initConfig(config);

    //Сказати які модулі необхідно виокристовувати
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');


    //Список завданнь по замовчування
    grunt.registerTask('default',
        [
            'browserify:cities',
            'browserify:city',
            'browserify:backpack',
            'browserify:aboutus'
        ]
    );

};