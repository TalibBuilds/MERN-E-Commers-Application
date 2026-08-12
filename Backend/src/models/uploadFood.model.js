const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    foodName: {
      type: String,
      required: [true, "Food name is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },

    foodImage: {
      type: String,
      required: [true, "Food image is required"],
      trim: true,
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const foodModel = mongoose.model("Food", foodSchema);

module.exports = foodModel;