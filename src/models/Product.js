import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    price: {
      type: String,
      require: true,
    },
    type: {
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
