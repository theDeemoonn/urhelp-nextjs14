import ChatBubble from "@/components/chat-bubble";
import MessageSend from "@/components/message";





import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ScrollArea } from "@/components/ui/scroll-area";

import Product from "@/models/products";
import User from "@/models/user";

import { IProduct } from "@/types/IProduct";
import { IUser } from "@/types/IUser";
import { getServerSession } from "next-auth";
import Link from "next/link";

interface ICommentUser extends IUser {
  _id: string;
}

interface IComment extends Omit<IProduct, "comments"> {
  _id: string;
  comments: ICommentUsers[];
}
interface ICommentUsers {
  _id: string;
  name: string;
  comment: string;

  time: string;
  user: IUser;
}

async function oneOrder({ params }: { params: { id: string } }) {
  const session = await getServerSession();

  async function getOrder(id: string) {
    "use server";

    const orderItems = (await Product.findOne({ _id: id })
      .populate("comments")
      .populate("comments.user")
      .exec()

      .then((res) => res)) as IComment;

    if (orderItems) {
      return orderItems;
    }
    return null;
  }

  async function getUser() {
    "use server";

    const user: ICommentUser | null = await User.findOne({
      email: session?.user?.email,
    });
    if (user) {
      return JSON.parse(JSON.stringify(user._id));
    }
    return null;
  }

  function isAuth() {
    if (session) {
      return true;
    }
    return false;
  }

  const userID = await getUser();

  const orderItems = await getOrder(params.id);

  return (
    <div className="flex flex-col items-center justify-center sm:p-22 px-3 pt-12 pb-6">
      <Card className="bg-card shadow-xl rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-16 max-sm:p-5">
        <CardHeader>
          <CardTitle>{orderItems?.title}</CardTitle>

          <CardDescription>
         
              <p>Категория: {orderItems?.category}</p>
              <p>Цена: {orderItems?.price}</p>
              <p>Описание: {orderItems?.description}</p>
              <p>Дата: {orderItems?.date}</p>
          
          </CardDescription>
          <CardContent className="p-0">
            {isAuth() ? (
            <ScrollArea className="h-[400px] w-full rounded-md border p-4">
              {orderItems?.comments.map((item) => (
                <ChatBubble 
                  key={item._id}
                  userName={item.user?.name!}
                  text={item.comment}
                  time={item.time}
                  avatar={item.user?.avatar!}
                  dir={
                    item.user?.email === session?.user?.email ? "rtl" : "ltr"
                  }
                />
              ))}
            
            </ScrollArea>
            ) : (
              <div className="flex flex-col items-center justify-center">
               <p className="mt-5 text-2xl">Чтобы отправить сообщение, вам необходимо <Link prefetch className=" text-primary"  href="/login">войти</Link> или <Link prefetch className=" text-primary" href="/register">зарегистрироваться</Link></p>
              </div>
            )}
          </CardContent>
        </CardHeader>
        {isAuth() ? (
        <CardFooter>
          <MessageSend key={userID} userId={userID} id={params.id} />
        </CardFooter>
        ) : null}
      </Card>
    </div>
  );
}

export default oneOrder;
