import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    SKU: {
      type: String,
    },
    name: {
      type: String,
      require: true,
    },
    price: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    subCategory: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    rating: {
      type: String,
    },
    specs: [
      {
        colorId: String,
        title: String,
        quantity: Number,
        imgList: [
          {
            type: String,
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  },
);
export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
