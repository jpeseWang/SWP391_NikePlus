import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema(
    {
        title: {
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
        authorInfo:
        {
            authorID: String,
            authorEmail: String,
            authorName: String,
            authorRole: String,
        },
        comment: [
            {
                authorInfo:
                {
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
    { timestamps: true }
);


export default mongoose.models.Post || mongoose.model("Post", postSchema);