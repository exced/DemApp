var mongoose = require('mongoose');
express = require('express');
cors = require('cors');
morgan = require('morgan');
config = require('./config/database');
passport = require('passport');
routes = require('./routes/routes');
bodyParser = require('body-parser');

var app = express();

/* mongoDB connection */
mongoose.connect(config.database);

mongoose.connection.on('open', function(){
    console.log('Mongo is connected');
});

/* Let Express know './public' is a public directory.*/
app.use(express.static('./public'));
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: false, limit: '30mb'}));
app.use(bodyParser.json({limit: '30mb'}));
app.use(routes);
/* let Express know where the passport config for user authentication is */
app.use(passport.initialize());
require('./config/passport')(passport);

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


