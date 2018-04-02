class User {
    constructor() {

    }
    signup(req, res) {
        var user = new user({ username: req.body.username });
        user.set('hashed_password', hashPW(req.body.password));
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
        User.findOne({ username: req.body.username }).exec(function (err, user) {
            if(err){
              req.session.regenerate(function(){
                  req.session.msg = err;
                  res.redirect('/login')
              })  
            }
            if (!user) {
                err = "User not found";
            } else if (user.hased_password ===
                hashPw(req.body.password.toString())) {
                req.session.regenerate(function () {
                    req.session.user = user.id;
                    req.session.username = user.username;
                    req.session.msg ='Authenticated as' + user.username;
                    res.redirect('/')
                })
            } else {
                err = "Authentication failed";
            }
        });
    }

}
// exports.signup = function(req,res){
    
// }
module.exports = new User();
// exports.login = function (req,res){
    

// }