var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;  
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

mongoose.connect('mongodb://localhost/login'); 

require('./config/passport')(passport);

app.use(cookieParser()); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); 


app.use(session({
    secret: 'sesh', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 

require('./routes.js')(app, passport); 

app.listen(port);
console.log('Running on Port:  ' + port); //port
