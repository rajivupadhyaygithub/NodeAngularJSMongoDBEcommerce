/* load dependancy modules */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var Resource = require('express-resource');

var mongodb = require('mongodb');
var dbConfig = require('./config/database');
var mongoose = require('mongoose');

/* passport module */
var passport = require('passport');
var expressSession = require('express-session');

var db = mongoose.connection;
mongoose.connect(dbConfig.url);

/* config routers */
var categories = require('./routes/categories');
var products = require('./routes/products');
var cart = require('./routes/cart');

/* init the Meanapp */
var app = express();

app.use(expressSession({
    secret: 'mySecretKey'
}));
app.use(passport.initialize());
app.use(passport.session());

/* setup used middlewear, view engine setup*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*app.use(function(req, res) {
    console.log(req);
    res.sendfile(__dirname + '/public/index.html');
});*/

require('./routes/auth')(app);


app.resource('cart/current', require('./routes/restfulCartItems'));

app.use('/categories', categories);
app.use('/products', products);
app.use('/cart', cart);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
