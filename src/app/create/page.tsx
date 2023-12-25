import CreateOrderModal from "@/components/create-order-modal";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { connectMongoDB } from "@/lib/mongodb";
import orderItems from "@/models/order-items";

import { IOrderItems } from "@/types/Iorder-items";

import Image from "next/image";

const CreateOrder = async () => {
  async function getOrderItems() {
    "use server";
    connectMongoDB();
    const orderItemsArray = (await orderItems
      .find()
      .then((res) => res)) as IOrderItems[];
    if (orderItemsArray) {
      return orderItemsArray;
    }
    return null;
  }

  const orderItemsArray = await getOrderItems();

  return (
    <div className="flex min-h-screen flex-wrap gap-3 items-center justify-between px-24 pt-24 pb-6">
      {orderItemsArray?.map((item) => (
        <Card key={item._id} className="w-[450px] ">
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </CardHeader>

          <CardFooter className="flex justify-between">
            <Image
              width={40}
              height={40}
              src={item.logo}
              alt="Picture of the author"
            />
            <CreateOrderModal title={item.title} />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default CreateOrder;
