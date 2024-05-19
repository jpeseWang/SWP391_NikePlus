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
    imageSrc: {
      type: String,
      require: true,
    },
    rating: {
      type: String,
      require: true,
    },
    defaultImg: [
      {
        type: String,
      },
    ],
    colors: [
      {
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
  }
);
export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
