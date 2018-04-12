const crypto = require('crypto');
const mongoose = require('mongoose');
const User = mongoose.model('User');
class Consumer {
    constructor() {

    }
    hashPw (pwd) {
        return crypto.createHash('sha256').update(pwd).digest('base64').toString();
    }
    signup(req, res) {
        const self = this;
        var user = new User({ username: req.body.username });
        user.set('hashed_password', self.hashPw(req.body.password));
        user.set('email', req.body.emai);
        user.save(function (err) {
            if (err) {
                res.session.error = err;
                res.redirect('/signup');
            } else {
                if (err) {
                    res.session.error = err;
                    res.redirect('/signup');
                } else {
                    req.session.user = user.uid;
                    req.session.username = user.username;
                    req.session.msg = 'Authenticated as' + user.username;
                    res.redirect('/')
                }
            }
        });
    }

    login(req, res) {
        const self = this;
        User.findOne({ username: req.body.username }).exec(function (err, user) {
            if (err) {
                req.session.regenerate(function () {
                    req.session.msg = err;
                    res.redirect('/login')
                })
            }
            if (!user) {
                err = "User not found";
            } else if (user.hased_password ===
                self.hashPw(req.body.password.toString())) {
                req.session.regenerate(function () {
                    req.session.user = user.id;
                    req.session.username = user.username;
                    req.session.msg = 'Authenticated as' + user.username;
                    res.redirect('/')
                })
            } else {
                err = "Authentication failed";
            }
        });
    }

    getUserProfile(req,res){
        User.findOne({_id:req.session.user}).exec(function(err,user){
            if(!user){
                res.json(404,{err:'User Not Found'});
            } else {
                res.json(user)
            }
        });
    }

    updateUser(req,res){
        User.findOne({_id:req.session.user}).exec(function(err,user){
            user.set('email',req.body.email);
            user.set('color',req.body.color);
            user.save(function(err){
                if(err){
                    res.session.error = err;
                } else {
                    res.session.msg = 'User Updated'
                };
                res.redirect('/user');

            })
        })
    }

    deleteUser(req,res){
        user.findOne({_id:req.session.user}).exec(function(err,user){
            if(user){
                user.remove(function(err){
                    if(err){
                        req.session.msg = err;
                    } else {
                        req.session.destroy(function(){
                            res.redirect('/login')
                        })
                    }
                })
            } else {
                req.session.msg = "User not Found";
                req.session.destroy(function(){
                    res.redirect('/login')
                })
            }
        });
    }    
}

module.exports = new Consumer();