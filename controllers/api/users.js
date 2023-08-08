
const express = require('express');
const router = express.Router();

const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createJWT = (user) => {
  return jwt.sign(
    { user },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  )
}

// const checkToken = (req, res) => {
//   console.log('req.user', req.user)
//   res.json(req.exp)
// }

// const apiController = {
//   auth (req, res) {
//     res.json(res.locals.data.token)
//   }
// }


const create = (req, res) => {
  User.create(req.body, (error, createdUser) => {
    if (error) {
      console.error(error);
      res.status(400).json(error)
    } else {
      const token = createJWT(createdUser);
      res.status(201).json({
        jwt_token: token
      })
    }
  });
}

const login = (req, res) => {
  User.findOne({ email: req.body.email }, async (error, foundUser) => {
    if (foundUser) {
      const result = await bcrypt.compare(req.body.password, foundUser.password)
      if (result) {
        const token = createJWT(foundUser);
        res.status(200).json({
          jwt_token: token
        })
      } else {
        res.status(401).json({
          error: 'incorrect password'
        })
      }
    } else {
      res.status(404).json({
        error: 'User Not Found!'
      })
    }
  })
}



// const validate = (req, res, next) => {
//   // console.log(token)
//   console.log(req.header("JWT-Token"))
//   if (req.header('JWT-Token')) { // if the correct header exists
//     let decoded = jwt.decode(req.header('JWT-Token'), jwtSecret); // decode the jwt token that is contained within it
//     if (decoded.name && decoded.password) { // if the decoded token has both a name and password field
//       User.findOne({ // finds the user associated with the name from the token
//         name: decoded.name
//       }, (error, foundUser) => {
//         if (error) {
//           console.error(error); // error handling for user not found
//           res.status(404).json({
//             error: error
//           });
//         } else {
//           if (decoded.password === foundUser.password) { // if the decoded password (still hashed) matches the password stored in the database (still hashed)
//             req.name = foundUser.name
//             req.id = foundUser._id
//             next(); // do the next thing (because it is successfully validated)
//           } else {
//             res.status(403).json({ // sends back forbidden because username and password combo are wrong
//               message: 'Wrong username and password combo'
//             });
//           }
//         }
//       });
//     } else {
//       res.status(403).json({
//         message: 'Token not readable'
//       });
//     }
//   } else {
//     res.status(403).json({
//       message: 'Invalid headers'
//     }); // sends back forbidden because header does not exist
//   }
// }

// router.get("/id", validate, (req, res)=>{
//   user.find({_id: req.id}, (err, user)=>{
//       if(err){
//           res.status(404).json({
//               message: "Could not find user with that ID."
//           })
//       } else {
//           res.status(200).json({user: user})
//       }
//   })
// })


// router.get("/account/:userId", (req, res)=>{
//   place.find({_id: req.params.userId}, (err, place)=>{
//       if(err){
//           res.status(404).json({message: "Could not find a user with that Id."})
//       } else {
//           res.status(200).json({user})
//       }
//   })
// })

// router.get("/all", (req, res)=>{
//   user.find((err, allUsers)=>{
//       if(err){
//           res.status(404).json({
//               message: "Error. No user data found."
//           })
//       } else {
//           res.status(200).json({
//           usersList: allUsers})
//       }
//   })
// })


module.exports = {
  create,
  login,
  // checkToken,
  // apiController,
  // validate,
}

