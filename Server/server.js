var mongoose = require('mongoose');
express = require('express');
cors = require('cors');
morgan = require('morgan');
config = require('./config/database');
passport = require('passport');
routes = require('./routes/routes');
bodyParser = require('body-parser');


mongoose.connect(config.database);

mongoose.connection.on('open', function(){
    console.log('Mongo is connected');
    var app = express();
    /* Let Express know './img' is a public directory.*/
    app.use(express.static('./img'));
    app.use(morgan('dev'));
    app.use(cors());
    app.use(bodyParser.urlencoded({extended: false, limit: '30mb'}));
    app.use(bodyParser.json({limit: '30mb'}));
    app.use(routes);
    /* let Express know where the passport config for user authentication is */
    app.use(passport.initialize());
    require('./config/passport')(passport);
    
    app.listen(3000, function(){
        console.log('server listening on : http://localhost:3000');
    })
})

