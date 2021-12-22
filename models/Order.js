const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  totalCost: {
    type: Number,
    default: 0,
  },
  orderId: {
    type: Number,
    default: 0,
  },
  order: {
    type: String,
    default: "",
  },
  dateTime: {
    type: Date,
    default: Date.now,
  },
  firstGet: {
    type: Boolean,
    default: false,
  },
});

module.exports = Order = mongoose.model("Order", orderSchema);
