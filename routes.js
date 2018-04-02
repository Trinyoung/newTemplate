var crypto = require('crypto');
var express = require('express');
module.exports = function (app,passport) {
    var users = require('./controllers/user_controller');
    app.get('/', function (req, res) {
        if (req.session.user) {
            res.render('index', { username: req.session.username, msg: req.session.msg })
        } else {
            req.session.msg = 'Access denied';
            res.redirect('/login')
        }
    });

    app.get('/user', function (req, res) {
        if (req.session.user) {
            res.render('user', { msg: req.session.msg })
        } else {
            req.session.msg = "Access denied";
            res.redirect('/login')
        }
    });

    app.get('/signup', function (req, res) {
        if (req.session.user) {
            res.redirect('/');
        }

        res.render('signup', { msg: req.session.msg })
    });

    app.get('/login', function (req, res) {
        if (req.session.user) {
            res.redirect('/')
        }

        res.render('login', { msg: req.session.msg })
    });

    app.get('/logout', function (req, res) {
        req.session.destory(function () {
            res.redirect('/login')
        });
    });

    // app.post('/signup', users.signup);
    // app.post('/user/update', users.updateUser);
    // app.post('/user/delete', users.deleteUser);
    // app.post('/login', users.login);
    // app.get('/user/profile', users.getUserProfile);
};