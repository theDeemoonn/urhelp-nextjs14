import { connectMongoDB } from "@/lib/mongodb";
import Product from "@/models/products";
import User from "@/models/user";
import { IUser } from "@/types/IUser";
import { getServerSession } from "next-auth";

import { NextResponse } from "next/server";

export interface ICreateOrderProps extends IUser {
  _id: string;
}

export async function POST(req: any) {
  const session = await getServerSession();

  async function getUser() {
    "use server";
    connectMongoDB();
    const user: ICreateOrderProps | null = await User.findOne({
      email: session?.user?.email,
    });
    if (user) {
      return user._id;
    }
    return null;
  }

  try {
    const { ...data } = await req.json();
    await Product.create({ ...data, userId: await getUser() });
    return NextResponse.json({ message: "Продукт создан" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Произошла ошибка при создании" },
      { status: 500 }
    );
  }
}
