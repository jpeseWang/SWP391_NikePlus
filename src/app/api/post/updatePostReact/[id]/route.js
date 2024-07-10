import { NextResponse } from "next/server";
import CommonUtil from "@/common/commonUtils";
import Post from "@/models/Post";

export const PUT = async (request, { params }) => {
  const { id } = params;
  const authorID = await request.json();

  try {
    await CommonUtil.connectDB();
    const post = await Post.findByIdAndUpdate(id);
    if (!post) {
      return new NextResponse("Post not found", { status: 404 });
    }

    const reactIndex = post.like.findIndex(
      (react) => react.authorID === authorID.authorID,
    );

    if (reactIndex === -1) {
      post.like = post.like.concat(authorID);
    } else {
      post.like.splice(reactIndex, 1);
    }

    await post.save();

    return new NextResponse("Post like has been updated", { status: 200 });
  } catch (err) {
    return new NextResponse(`Database Error: ${err}`, { status: 500 });
  }
};
