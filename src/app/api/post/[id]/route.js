import { NextResponse } from "next/server";
import CommonUtil from "@/common/commonUtils";
import Post from "@/models/Post";

export const GET = async (request, { params }) => {
  const { id } = params;

  try {
    await CommonUtil.connectDB();
    const post = await Post.findById(id);
    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};


export const DELETE = async (request, { params }) => {
  const { id } = params;

  try {
    await CommonUtil.connectDB();
    await Post.findByIdAndDelete(id);
    return new NextResponse("Post has been deleted", { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};


export const PUT = async (request, { params }) => {
  const { id } = params;
  const newComment = await request.json();

  try {
    await CommonUtil.connectDB();
    const post = await Post.findByIdAndUpdate(id);
    if (!post) {
      return new NextResponse("Post not found", { status: 404 });
    }

    post.comment = post.comment.concat(newComment);

    await post.save();

    return new NextResponse("Post has been updated", { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
