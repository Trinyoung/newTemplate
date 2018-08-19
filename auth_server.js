//模块依赖
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var mongoStore = require('connect-mongo')({ session: expressSession });
var mongoose = require('mongoose');
var passport = require('passport')
// 下面的行确保User model在Mongoose中注册；
require('./models/users_model.js');
var conn = mongoose.connect('mongodb://localhost/myapp');
var app = express();

// 设置
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(bodyParser());
app.use(cookieParser());

// 下面Express 配置代码使用connect-mongo 库把MongoDB连接作为已通过身份验证的会话的持久性存储来注册。
// 请注意，connect-mongo存储传递一个对象和设定到express-session模块实例的session。还要注意，在mongoose实例的db
// 值被设定为已经连接的mongoose.connection.db数据库：
app.use(expressSession({
    secret: 'SECRET',
    cookie: { maxAge: 60 * 60 * 1000 },
    store: new mongoStore({
        db: mongoose.connection.db,
        url: 'mongodb://localhost/myapp',
        collection: 'sessions'
    })
}));

app.use('/static', express.static('./static'))
.use('/lib', express.static('../lib'))
;
// 下面的require()添加从./routes到express服务器的路由a：
require('./router')(app,passport);

app.listen(80);