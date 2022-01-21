var express         = require('express'),
    routes          = express.Router();
var userController  = require('./controller/user-controller');
var passport	    = require('passport');
var User = require('./models/user');
 
routes.get('/', (req, res) => {
    return res.send('Hello, this is the API!');
});
 
routes.post('/register', userController.registerUser);
routes.post('/login', userController.loginUser);


routes.get('/special', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({ msg: `Hey ${req.user.email}! I open at the close.` });
});

// GET
// Get all open list
routes.get('/list', function (req, res) {
    User.find({}, function (err, list) {
      if (err) {
        return res.json({ "success": false, "msg": "Error while searching list", "error": err });
      }
   
      res.status(200).send({ "success": true, "result": list });
    });
  });
   
// DELETE
// Remove one user by its ID
routes.delete('/list/:id', function (req, res, next) {
  User.findByIdAndRemove({_id:req.params.id}).then(function(user){
    res.send(user);
  });
});

module.exports = routes;