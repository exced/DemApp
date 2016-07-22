var User = require('../model/user');
var config = require('./database');
var prompt = require('prompt');
var mongoose = require('mongoose');

mongoose.connect(config.database);

mongoose.connection.on('open', function(){

	prompt.start();

	prompt.get(['name', 'password', 'firstname', 'lastname'], function(err, res){
		if(err) return onError(err);
		res['authority'] = 'admin';
		/* save */
		User(res).save(function(err, newUser){
			if (err) throw err;
			if (err){
				onError('Failed to save admin');
			}
			else {
				onError('admin successfully added');	
			}
		});
	});

})

function onError(err){
	console.log(err);
	process.exit(1);
}





