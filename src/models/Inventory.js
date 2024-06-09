import mongoose from "mongoose";

const { Schema } = mongoose;

const inventorySchema = new Schema(
  {
    productId: {
      type: String,
    },
    quantity: {
      type: Number,
      require: true,
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
export default mongoose.models.Inventory ||
  mongoose.model("Inventory", inventorySchema);
