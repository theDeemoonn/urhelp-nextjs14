import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req:any) {
  try {
    const email = await req.json();

    await connectMongoDB();

    await User.findOneAndDelete({
      email: email,
    }).lean();

    return NextResponse.json(
      { message: "Пользователь удален успешно" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
