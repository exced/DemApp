var User = require('../models/user');
var Draw = require('../models/draw');
var config = require('./database');
var prompt = require('prompt');
var mongoose = require('mongoose');

mongoose.connect(config.database);

mongoose.connection.on('open', function(){

	prompt.start();

	console.log('Would you like to drop database and images folders ?');
	prompt.get(['y/n'], function(err, res){
		if(err) return onError(err);
		if(res['y/n'] === 'y'){
			/* Drop the DB */
			mongoose.connection.db.dropDatabase();
			/* remove all images folders */
			var exec = require('child_process').exec;
			var cmd = 'cd ../public/images/ && rm -r *';

            exec(cmd, function(error, stdout, stderr) { // command output is in stdout
            	if (stderr) throw stderr;
            	console.error(stderr); 
            });
        }
        process.exit(1);
    });

})






