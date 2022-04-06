const mongoose = require("mongoose");

// start mongodb database
module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect(process.env.DB, connectionParams);
    console.log("Connected to database successfully");
  }
  catch (error) {
    console.log(error);
    console.log("Could not connect database!");
  }
};