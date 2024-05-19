import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema(
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
  },
  {
    timestamps: true,
  }
);
export default mongoose.models.Order || mongoose.model("Order", orderSchema);
