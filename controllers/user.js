// Import User Schema

var db_user = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../config/config.json');
// Read User

exports.get_user = (req,res)=>{
    var user_id = req.params.user_id;
    db_user.find({_id: user_id},function (err, data) {
    if (data === null) {
        res.json({
            success : false ,
            message : "User does not exist"
        });
    } else {
       res.send(data);
    //    res.json({
    //     success : true ,
    //     message : "User Details",
    //     data
    // });
    }
  });
}


exports.get_userr = (req,res)=>{
    console.log(req.headers.token);
    jwt.verify(req.headers.token,config.secret_token,function(err,token){
    if(err){
    // respond to request with error
    res.json({
        success : false ,
        message : "User not valid"
    });
    }else{
    // token._id;
    console.log(token);
    db_user.find({_id:token.id},function(err,data){
    if (data === null) {
        res.json({
            success : false ,
            message : "User does not exist"
        });
    } else {
       res.json({
        success : true ,
        message : "User Details",
        data : data
    });
    }

    })
    }
});}
//     var user_id = req.params.user_id;
//     db_user.find({_id: user_id},function (err, data) {
//     if (data === null) {
//         res.json({
//             success : false ,
//             message : "User does not exist"
//         });
//     } else {
//        res.send(data);
//     //    res.json({
//     //     success : true ,
//     //     message : "User Details",
//     //     data
//     // });
//     }
//   });
// }

// Delete User

exports.delete_user = (req,res)=>{
    var user_id = req.params.user_id;
    db_user.deleteOne({_id: user_id},function (err, data) {
           if (data.deletedCount === 0) {
            res.json({
                success : false ,
                message : "User does not exist"
            });
    } else {
        res.json({
            success : true ,
            message : "User deleted"
        });
    }
});
}

// Update User

exports.update_user = (req,res)=>{
    var user_id = req.params.user_id;
    var content = req.body;
    db_user.findOneAndUpdate({_id: user_id},content,{new: true},function (err, data) {
           if (data === null) {
            res.json({
                success : false ,
                message : "User does not exist"
            });
    } else {
        res.json({
            success : true ,
            message : "User updated"
        });
    }
      });
   }

// See All Users
   exports.show_all_users = (req, res) => {   
   
      db_user.find({}, function (err, data) {
          res.send(data);
      });
 
}
