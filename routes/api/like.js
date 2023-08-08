const express = require('express');
const router = express.Router();

const user = require('../../models/User')
const blogpost = require('../../models/Blogpost')


router.put("/favorite/add/:placeId", validate, (req, res) => {
    user.updateOne(
      {
        _id: req.id,
      },
      {
        $push: {
          favorites: req.params.placeId,
        },
      },
      (error, updatedUser) => {
        if (error) {
          console.error(error);
          res.status(404).json({
            error: "No user to add favorite to.",
          });
        } else {
          place.updateOne(
            {
              _id: req.params.placeId,
            },
            {
              $inc: {
                favorites: 1,
              },
              $push: {
                favorite_users: req.id,
              },
            },
            (error, updatedPlace) => {
              if (error) {
                console.error(error);
                res.status(404).json({
                  error: "Could not update the favorites of place.",
                });
              } else {
                res.status(202).json({
                  message:
                    "Successfully updated the user and place favorite lists.",
                });
              }
            }
          );
        }
      }
    );
  });
  

module.exports = router