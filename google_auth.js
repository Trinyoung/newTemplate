var express = require('express');
    passport = require('passport');
    GoogleStragy = require('passport-google').Strategy;

passport.serializeUser(function(user,done){
    done(null,user);
});

passport.deserializeUser(function(obj,done){
    done(null,obj)
});

passport.use(new GoogleStragy({
    returnURL:'http://localhost/auth/google/return',
    realm:'http://localhost'
},function(identifier,profile,done){
    process.nextTick(function(){
        profile.identifier = identifier;
        return done(null, profile)
    })
}))
