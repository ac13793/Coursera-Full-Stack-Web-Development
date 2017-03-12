var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify = require('./verify');

var Favorites = require('../models/favorites');

var favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());
favoriteRouter.route('/')
    .get(Verify.verifyOrdinaryUser, function (req, res, next) {
        Favorites.find({})
            .populate('postedBy')
            .populate('dishes')
            .exec(function (err, favorites) {
                if (err) throw err;
                res.json(favorites);
            });
    })

    .post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
        Favorites.find({ postedBy: req.decoded._doc._id }).exec(function (err, favorite) {
            if (err) throw err;
            if (favorite.length > 0) {
                var index = favorite[0].dishes.indexOf(req.body._id);
                if (index >= 0) {
                    res.json(favorite)
                } else {
                    favorite[0].dishes.push(req.body._id);
                    favorite[0].save(function (err, result) {
                        if (err) throw err;
                        res.json(result);
                    });
                }
            } else {
                Favorites.create({ postedBy: req.decoded._doc._id, dishes: req.body._id }, function (err, favorite) {
                    if (err) throw err;
                    console.log('favorite created!');
                    res.json(favorite);
                });
            }

        })
    })

    .delete(Verify.verifyOrdinaryUser, function (req, res, next) {
        Favorites.remove({}, function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });

favoriteRouter.route('/:favoriteId')
    .delete(Verify.verifyOrdinaryUser, function (req, res, next) {
        Favorites.find({ postedBy: req.decoded._doc._id }).exec(function (err, favorite) {
            if (err) throw err;
            if (favorite.length > 0) {
                var index = favorite[0].dishes.indexOf(req.params.favoriteId)
                favorite[0].dishes.splice(index, 1);
                favorite[0].save(function (err, resp) {
                    if (err) throw err;
                    res.json(resp);
                });
            } else {
                res.json(favorite);
            }

        });
    });



module.exports = favoriteRouter;
