var mongoose = require('mongoose');

Schema = mongoose.Schema;

var userSchema = new Schema({
    username:{type:String,unique:true},
    email: String,
    color: String,
    hashed_password: String
})
mongoose.model('User',userSchema);