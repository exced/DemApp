var Draw = require('../models/draw');
var User = require('../models/user');
var config = require('../config/database');
var jwt = require('jwt-simple');

var functions = {


    /* --------------------get-------------------- */
    onDrawGetAll: function(req, res){

        if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            var token = req.headers.authorization.split(' ')[1];
            var decodedtoken = jwt.decode(token, config.secret);

            var query;

            switch (decodedtoken.authority){
                case 'admin':
                query = {name:req.params.username};
                break;
                case 'user':
                query = {name:req.params.username, user: decodedtoken._id};
                break;
            }

            /* find user */
            User.findOne(query, function(err, userFound){
                if (err) throw err;

                if(!err){
                    /* find user's draw*/
                    Draw.find({user: userFound._id}).sort('-date').exec(function(err, draws){

                        if (err) throw err;

                        if(!err){
                            return res.json({success: true, draws: draws});
                        }
                        else {
                            return res.json({success:false, msg: 'No draw found'});
                        }

                    });             
                }
                else {
                    return res.json({success:false, msg: 'user not found'});
                }
            })  
        }
        else {
            return res.json({success:false, msg: 'No header'});
        }
    },


    /* --------------------actions-------------------- */
    onDrawCreate: function(req, res){
        if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            var token = req.headers.authorization.split(' ')[1];
            var decodedtoken = jwt.decode(token, config.secret);
            /* only guest can draw */
            if(decodedtoken.authority === 'guest'){

                var img = req.body.img;
                var fs = require("fs");

                /* create directory */
                fs.mkdir('./public/images/' + decodedtoken.name, function(error) {
                    console.error(error);
                });

                /* C++ call cmd */
                var exec = require('child_process').exec;
                var cmd = './cpp/score';

                exec(cmd, function(error, stdout, stderr) { // command output is in stdout

                    /* store the result */
                    newDraw = Draw({
                        score: stdout,
                        user: decodedtoken._id
                    });
                    newDraw.image = decodedtoken.name + '/' + newDraw._id + '.png';

                    /* write image */
                    req.body.img = req.body.img.replace(/^data:image\/\w+;base64,/, "");
                    req.body.img = req.body.img.replace(/ /g, '+');
                    fs.writeFile('./public/images/' + newDraw.image, req.body.img, 'base64', function(error) {
                        console.error(error);
                    });

                    /* save */
                    newDraw.save(function(err, newDraw){
                        if (err) throw err;
                        if (err){
                            res.json({success:false, msg:'Failed to save'})
                        }
                        else {
                            res.json({success:true, msg:'Successfully saved'});
                        }
                    }) 
                });
            }
            else{
               return res.status(403).send({success: false, msg: 'not guest'});
           }
       }
       else {
        return res.json({success:false, msg: 'No header'});
    }
}


}

module.exports = functions;
