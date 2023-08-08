const express = require('express');
const router = express.Router();

// // const user = require ('../models/User')
// const blogpost = require ('../../models/Blogpost')
// // const comment = require ('../models/Comment')


// router.get('/', (req, res) => {
//     console.log("HIII")
//     res.status(200).json({
//       message: "blogposts"
//     });
// });



// router.post("/addblogpost", (req, res) =>{
//     const blogpostData = req.body
//     blogpost.create(blogpostData, (error, createdBlogpost) =>{
//         if (error){
//             console.error(error);
//             res.status(400).json({
//                 error: "Error occured. Blogpost not created."
//             })
//         } else {
//             console.log("Blogpost created successfully.");
//             res.status(200).json({
//                 message: "Blogpost was successfully created.",
//                 place: createdBlogpost
//             })
//         }
//     })
// })





// router.post("/blogposts/add/:blogpostId/:userId", (req, res) => {
//     user.updateOne(
//       {
//         // _id: req.id, (with validate function)
//        _id: req.params.userId
//       },
//       {
//         $push: {
//           blogposts: req.params.blogpostId,
//         },
//       },
//       (error, updatedUser) => {
//         if (error) {
//           console.error(error);
//           res.status(404).json({
//             error: "No user to add blogpost to.",
//           });
//         } else {
//           blogposts.updateOne(
//             {
//               _id: req.params.blogpostId,
//             },
//             (error, createdBlogpost) => {
//               if (error) {
//                 console.error(error);
//                 res.status(404).json({
//                   error: "Could not add blogpost.",
//                 });
//               } else {
//                 res.status(202).json({
//                   message:
//                     "Successfully added blogpost and updated the user.",
//                 });
//               }
//             }
//           );
//         }
//       }
//     );
//   });


module.exports = router