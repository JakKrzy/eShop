const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true },
    numReview: { type: Number, required: true },
    price: { type: Number, required: true },
    stock: { type: String, required: true },
    
    // reviews: [] idk if we're doing reviews
    }
 
);

module.exports = mongoose.model("Product",productSchema);