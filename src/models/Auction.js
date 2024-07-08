import mongoose from "mongoose";

const { Schema } = mongoose;

const auctionSchema = new Schema(
  {
    item: {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      imgSrc: {
        type: String,
      },
    },
    startingBid: {
      type: Number,
      required: true,
    },
    currentBid: {
      type: Number,
      default: 0,
    },
    bids: [
      {
        bidderInfo: {
          bidderID: String,
          bidderEmail: String,
          bidderName: String,
        },
        bidAmount: {
          type: Number,
          required: true,
        },
        bidTime: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    auctioneerInfo: {
      auctioneerID: String,
      auctioneerEmail: String,
      auctioneerName: String,
      auctioneerRole: String,
    },
    auctionEndTime: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Auction ||
  mongoose.model("Auction", auctionSchema);
