var User = require('../models/user');
var config = require('../config/database');
var jwt = require('jwt-simple');


var functions = {

    /* --------------------log-------------------- */

    onAuthenticate: function(req, res) {

        User.findOne({
            name: req.body.name
        }, function(err, user){
            if (err) throw err;

            if(!user) {
                res.status(403).send({success: false, msg: JSON.stringify(user)});
            }

            else {
                user.comparePassword(req.body.password, function(err, isMatch){
                    if(isMatch && !err) {
                        var token = jwt.encode(user, config.secret);
                        res.json({success: true, token: token, user: user});
                    } else {
                        return res.status(403).send({success: false, msg: 'Authenticaton failed, wrong password.'});
                    }
                })
            }

        })
    },

    /* --------------------create-------------------- */

    onUserRegister: function(req, res){

        if((!req.body.name) || (!req.body.password) || (!req.body.firstname) || (!req.body.lastname)){
            res.json({success: false, msg: 'Enter all values'});
        }
        else {       

            /* not authenticated */
            var newUser = User({
                name: req.body.name,
                password: req.body.password,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                authority: 'user'
            });

            /* save */
            newUser.save(function(err, newUser){
                if (err) console.error(err);
                if (err){
                    res.json({success:false, msg:'Failed to save'})
                }
                else {
                    var token = jwt.encode(newUser, config.secret);
                    res.json({success:true, token: token, user:newUser});
                }
            }) 
        }
    },

    onUserCreate: function(req, res){

        var newUser = User();

        if((!req.body.name) || (!req.body.password) || (!req.body.firstname) || (!req.body.lastname)){
            res.json({success: false, msg: 'Enter all values'});
        }
        else {       

            /* authenticated */
            if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
                var token = req.headers.authorization.split(' ')[1];
                var decodedtoken = jwt.decode(token, config.secret);

                /* admin */
                if(decodedtoken.authority === 'admin'){

                    newUser = User({
                        name: req.body.name,
                        password: req.body.password,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        authority: 'user'
                    });               
                }                

                /* user */
                if(decodedtoken.authority === 'user'){

                    newUser = User({
                        name: req.body.name,
                        password: req.body.password,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        authority: 'guest',
                        user: decodedtoken._id
                    });                 
                }
                /* save */
                newUser.save(function(err, newUser){
                    if (err) console.error(err);
                    if (err){
                        res.json({success:false, msg:'Failed to save'})
                    }
                    else {
                        res.json({success:true, user:newUser});
                    }
                }) 
            }
        }
    },


    /* --------------------get-------------------- */

    onUserGetAll: function(req, res){

        /* authenticated */
        if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            var token = req.headers.authorization.split(' ')[1];
            var decodedtoken = jwt.decode(token, config.secret);

            var query;

            switch (decodedtoken.authority){
                case 'admin':
                query = {authority: {$ne: 'admin'}};
                break;
                case 'user':
                query = {authority: 'guest', user: decodedtoken._id};
                break;
            }

            /* find */
            User.find(query, function(err, users){
                if (err) throw err;

                if(!err){
                    return res.json({success: true, users: users});
                }
                else {
                    return res.json({success:false, msg: 'No users found'});
                }
            });                         
        }
    },

    onUserGet: function(req, res){

        /* authenticated */
        if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            var token = req.headers.authorization.split(' ')[1];
            var decodedtoken = jwt.decode(token, config.secret);

            var query;

            switch (decodedtoken.authority){
                case 'admin':
                query = {name: req.params.username};
                break;
                case 'user':
                query = {name: req.params.username, authority: 'guest', user: decodedtoken._id};
                break;
            }
            /* find */
            User.findOne(query, function(err, user){
                if (err) throw err;

                if(!err){
                    return res.json({success: true, user: user});
                }
                else {
                    return res.json({success:false, msg: 'user not found'});
                }
            })     
        }
    },    


    /* --------------------update-------------------- */

    onUserUpdate: function(req, res){

        /* authenticated */
        if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            var token = req.headers.authorization.split(' ')[1];
            var decodedtoken = jwt.decode(token, config.secret);


            if((!req.body.detailName) || (!req.body.detailValue)){
                res.json({success: false, msg: 'Enter all values'});
            }     
            else {

                var query;
                var update = {};
                update[req.body.detailName] = req.body.detailValue; 

                switch (decodedtoken.authority){
                    case 'admin':
                    query = {name: req.params.username};
                    break;
                    case 'user':
                    query = (req.params.username === decodedtoken.name) ? {name: req.params.username} : {name: req.params.username, user: decodedtoken._id}; 
                    break;
                }               

                /* find */
                User.findOne(query, function(err, user){
                    if (err) throw err;

                    if(!err){
                        /* update */
                        user[req.body.detailName] = req.body.detailValue;
                        /* save */
                        user.save(function(err, newUser){
                            if (err) throw err;
                            if (err){
                                res.json({success:false, msg:'Failed to save'})
                            }
                            else {
                                res.json({success:true, user:newUser});
                            }
                        }) 
                    }
                    else {
                        return res.json({success:false, msg: 'user not found'});
                    }
                }) 
            }

        }
        else {
            res.status(403).send({success: false, msg: 'wrong token'});
        }
    },




    /* --------------------delete-------------------- */

    onUserDelete: function(req, res){

        /* authenticated */
        if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            var token = req.headers.authorization.split(' ')[1];
            var decodedtoken = jwt.decode(token, config.secret);

            var query;

            switch (decodedtoken.authority){
                case 'admin':
                query = {name: req.params.username};
                break;
                case 'user':
                query = {name: req.params.username, authority: 'guest', user: decodedtoken._id};
                break;
            }

            /* delete */
            User.remove(query, function(err, user){
                if (err) throw err;

                if(!err){
                    return res.json({success: true, msg: 'delete Success'});
                }
                else {
                    return res.json({success:false, msg: 'user not found'});
                }
            })
        }
    }, 

}

module.exports = functions;
