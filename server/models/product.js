const mongoose = require("mongoose");

// product schema
const productsSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  article_number: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  img: { type: String, required: true },
});

const Products = mongoose.model("product", productsSchema);

module.exports = Products;