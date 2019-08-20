var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/studentDb', { useNewUrlParser: true }, function(err) {
    if (err) console.log(err);
    else console.log("Data-Base connected");
    });


var port = 8000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.listen(port, function() {
    console.log("App Run Successfully" + port);
});

require('./app/route')(app);
exports = module.exports = app;
