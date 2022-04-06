const router = require("express").Router();
const { User } = require("../models/user");

// user favorites
router.get("/", async (req, res) => {

  try {
    // get user
    User.find({ _id: req.query.id}, (err, result) => {
      // return user favorites
      res.status(200).send({ params: { favorites: result[0].favorites } , message: "request successfully" });
    });
  }
  catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// update user favorites
router.post("/", async (req, res) => {

  try {
    // update data
    User.updateOne({ _id: req.body.params.id }, { $set: { "favorites": req.body.params.favorites }}, (err, result) => {
      res.status(200).send({ message: "Reques Sucessfully" });
    });
  }
  catch (error) {
    console.log("Favorites Error")
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;