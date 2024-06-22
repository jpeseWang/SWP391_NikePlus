import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    userInfo:
    {
      userId: String,
      email: String,
      firstName: String,
      lastName: String,
      fullName: String,
      company: String,
      address: String,
      city: String,
      country: String,
      state: String,
      postalCode: String,
      phoneNumber: String,
    },

    orderInfo:
    {
      deliveryMethod: String,
      deliveryFee: String,
      shippingStatus: String,
      paymentMethod: String,
      paymentStatus: String,
      totalPrice: String,
    },

    products: Array,
  },
  {
    timestamps: true,
  },
);
export default mongoose.models.Order || mongoose.model("Order", orderSchema);
