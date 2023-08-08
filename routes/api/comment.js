const express = require('express');
const router = express.Router();

const user = require('../../models/User')
const blogpost = require('../../models/Blogpost')
const comment = require ('../../models/Comment')

router.get('/', (req, res) => {
  res.status(200).json({
    message: "comments"
  });
});



router.post("/add", (req, res) =>{
    const commentData = req.body
    comment.create(commentData, (error, createdComment) =>{
        if (error){
            console.error(error);
            res.status(400).json({
                error: "Error occured. Comment not created."
            })
        } else {
            console.log("Comment created successfully.");
            res.status(200).json({
                message: "Comment was successfully created.",
                comment: createdComment

            })
        }
    })
})

router.post("/addComment/:blogpostId/:userId", (req, res) => {
  const blogpostData = req.body
  blogpost.create(blogpostData, (error, createdBlogpost) => {
    if (error) {
      console.error(error);
      res.status(400).json({
        error: "Error occured. Blogpost not created."
      })
    } else {
      user.updateOne({
        // _id: blogpostData.user
        _id: req.params.userId
      },
        {
          $push: {
            blogposts: createdBlogpost._id
          }
        }, (error, updatedUser) => {
          if (error) {
            console.error(error);
            res.status(404).json({
              error: 'No user to add blogpost to.'
            });
          } else {
            blogpost.updateOne({
              _id: createdBlogpost._id
            },
              {
                $push: {
                  user: req.params.userId
                }
              }, (error, updatedBlogpost) => {
                if (error) {
                  console.error(error);
                  res.status(404).json({
                  error: 'No blogpost to add user to.'
                  });
                } else {
                  console.log('Successfully created blogpost and added it to user data.');
                  res.status(201).json({
                    message: 'Successfully created blogpost!',
                    blogpost: createdBlogpost
                  });
                }
              }
            )
          }
        }
      )
    }
  })
})








module.exports = router