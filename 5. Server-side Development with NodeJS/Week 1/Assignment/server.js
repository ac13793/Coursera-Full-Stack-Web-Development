'use strict';

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var hostname = 'localhost';
var port = 3000;

var app = express();
//morgan
app.use(morgan('dev'));

//Prepare dish CRUD operation
var opDish = require('./dishRouter');
opDish(express.Router(), bodyParser, function (err, dishRouter) {
    if (err) {
        console.log(err);
    } else {
        dishRouter.init(app, '/dishes');
    }
});

//Prepare promo CRUD operation
var opPromo = require('./promoRouter');
opPromo(express.Router(), bodyParser, function (err, promoRouter) {
    if (err) {
        console.log(err);
    } else {
        promoRouter.init(app, '/promotions');
    }
});

//Prepare leader CRUD operation
var opLeader = require('./leaderRouter');
opLeader(express.Router(), bodyParser, function (err, leaderRouter) {
    if (err) {
        console.log(err);
    } else {
        leaderRouter.init(app, '/leadership');
    }
});

//static files
app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function () {
    console.log(`Server running at http://${hostname}:${port}/`);
});
