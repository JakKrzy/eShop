const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    qty: {type: Number, required: true},
})

const orderSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"},
    orderItems: [orderItemSchema],
    shippingAddress: {
        address: {type: String, required: true},
        city: {type: String, required: true},
        postalCode: {type: String, required: true},
        country: {type: String, required: true}
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0,
    }    
},{
    timestamps: true
});

module.exports = mongoose.model("Order",orderSchema);
