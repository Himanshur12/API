// Importing Routes And Modules

var config = require('../config/config.json');
var db_user = require('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

//User Login
exports.login = (req,res)=>{
    console.log(req.body);
    var jsonParse = req.body;
    var email = jsonParse.email;
    var password = jsonParse.password;
                db_user.findOne({email:email}).exec()
                .then(result => {
                    var user_id=result._id;
                    if(!result)
                    res.json({
                        success : false ,
                        message : 'invalid User!'
                    });
                    if(result){
                        if(result.email!= email)
                        {
                            if(err) throw err;
                            res.json({
                                success : false ,
                                message : 'User Not Found!'
                            });
                        }
                        bcrypt.compare(password,result.password,(err,isMatch) =>{
                            if(err) throw err;
                            if(isMatch){
                                var token = jwt.sign({id:user_id,email:email,password:password},config.secret_token,{expiresIn: 60 * 60});

                            res.json({
                                success : true ,
                                message : 'Login Successfully!',
                                token : token
                            });
                            }
                            else
                            res.json({
                                success: false,
                                message:'Incorrect Password!'
                            });
                        });    
                    }
                })
                .catch(err => {
                    console.log(err);
                    return;
                })
}
