var express = require('express');
var bodyParser = require('body-parser');
var load = require('express-load');
var app = express();


module.exports = function () {
    var app = express();

    // configuração de ambiente
    app.set('port', 3000);

    app.use(express.static('./public'));
    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    app.use(bodyParser.urlencoded({
        extented: true
    }));
    app.use(bodyParser.json());
    app.use(require('method-override')());

    load('models', {
            cwd: 'app'
        })
        .then('controllers')
        .then('routes')
        .into(app);

    return app;
}