var express = require('express');
var router = express.Router();
var login_user = require('../controllers/login');
var register_user = require('../controllers/register');
var Services = require('../controllers/user');
var config = require('../config/config.json');
var myKey = config.secret_token;
var jwt = require('jsonwebtoken');

// Register Route For Post Method
router.post('/register', function(req,res){
  register_user.register(req,res)
});

// Login Route For Post Method
router.post('/login', function (req,res) {
  login_user.login(req,res)
});

// Token Verification

// const checkAuth = (req, res, next) => {
//   var auth_head=req.headers['token'];

//   if (typeof auth_head==='undefined') {
//    return res.json({
//       success : false ,
//       message : 'No Token Sent!'
//   });

//   }
//   else
//   {
//           jwt.verify(auth_head,myKey, (err,data) =>{
//           if(err) {
//               console.log(err);
//               res.sendStatus(400);
//           }
//           })
//           next();
//   }
// }
// router.use(checkAuth);

// Get User
router.get('/:user_id', function (req, res) {
  Services.get_user(req,res)
})
router.get('/user/token', function (req, res) {
  Services.get_userr(req,res)
})

//Delete User
router.delete('/:user_id', function(req,res){
  Services.delete_user(req,res)
})

// Update User
router.put('/:user_id', function(req,res){
  Services.update_user(req,res)
})

// Show All Users
router.get('/', function(req,res){
  Services.show_all_users(req,res)
})

/* GET users listing. */
router.get('/*', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
