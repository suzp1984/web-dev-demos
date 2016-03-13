var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var serveIndex = require('serve-index');
var app = express();


app.set('port', (process.env.PORT || 8000));

app.use('/', express.static(path.join(__dirname, './')));
app.use('/', serveIndex(path.join(__dirname, './')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.listen(app.get('port'), function() {
    console.log('Express server started at: http://localhost:' + app.get('port') + '/');
});
