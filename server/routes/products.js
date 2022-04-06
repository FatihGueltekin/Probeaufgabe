const router = require("express").Router();
const Product = require("../models/product");
const data = require("../data");

// get products from db
router.get("/", async (req, res) => {

  try {
    // get all products
    Product.find({}, (err, result) => {
      // Database not set jet send created Values
      if(err) res.json(data());
      else
      {
        if(result.length == 0)
        {
          res.json(data());
          // fill the database with sample data
          data().map(async (item) => {
            await new Product({ ...item }).save();
          })
        }
        // Dataset exists send back
        else res.json(result);
      }
    });
  }
  catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;