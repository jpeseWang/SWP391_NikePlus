import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    imgSrc: {
      type: String,
    },
    authorInfo: {
      authorID: String,
      authorEmail: String,
      authorName: String,
      authorRole: String,
    },
    like: [
      {
        authorID: String,
      },
      { timestamps: true },
    ],
    comment: [
      {
        authorInfo: {
          authorID: String,
          authorEmail: String,
          authorName: String,
          authorRole: String,
        },
        content: {
          type: String,
        },
      },
      { timestamps: true },
    ],
  },
  { timestamps: true },
);

export default mongoose.models.Post || mongoose.model("Post", postSchema);
