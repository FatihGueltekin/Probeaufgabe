const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

// new user
router.post("/", async (req, res) => {
  console.log("Users async")
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    // check if user email already exists
    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(409).send({ message: "User with given email already Exist!" });

    // crypt password
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // create the user
    await new User({ ...req.body, password: hashPassword, favorites: "" }).save();
    res.status(201).send({ message: "User created successfully" });
    console.log("User created sucsessfully")
  }
  catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
