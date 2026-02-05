import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  await connectDB();
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ error: "Bloglar yüklenemedi" }, { status: 500 });
  }
}

export async function POST(req) {
  await connectDB();
  
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const newBlog = await Blog.create(body);
    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Blog eklenemedi" }, { status: 400 });
  }
}

export async function PUT(req) {
  await connectDB();
  
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const body = await req.json();
    const updatedBlog = await Blog.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(updatedBlog);
  } catch (error) {
    return NextResponse.json({ error: "Blog güncellenemedi" }, { status: 400 });
  }
}

export async function DELETE(req) {
  await connectDB();
  
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    await Blog.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Blog silinemedi" }, { status: 400 });
  }
}
