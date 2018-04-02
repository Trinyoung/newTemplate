var mongoose = require('mongoose');

Schema = mongoose.Schema;

var userSchema = new Schema({
    Username:{type:String,unique:true},
    email: String,
    color: String,
    hased_password: String
})
mongoose.model('User',userSchema);