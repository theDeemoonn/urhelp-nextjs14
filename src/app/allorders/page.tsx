import PaginationLimits from "@/components/pagination-limit";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { connectMongoDB } from "@/lib/mongodb";
import Product from "@/models/products";
import User from "@/models/user";

import { IProduct } from "@/types/IProduct";
import { IUser } from "@/types/IUser";

import Image from "next/image";

const AllOrder = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const lastPage = searchParams.page?.[searchParams.page.length - 1] ?? 1;

  async function getAllOrder(limit?: number, skip?: number) {
    "use server";
    connectMongoDB();
    const allOrderItemsArray = (await Product.find()
      .skip(skip!)
      .limit(limit!)
      .then((res) => res)) as IProduct[];

    if (allOrderItemsArray) {
      return allOrderItemsArray;
    }
    return null;
  }

  async function getAllOrderCount() {
    "use server";

    const allOrderItemsCount =
      (await Product.find().countDocuments()) as number;

    if (allOrderItemsCount) {
      return allOrderItemsCount;
    }
    return null;
  }

  const allOrderItemsCount = await getAllOrderCount();

  let page = parseInt(lastPage as string, 10);

  let limit = parseInt(searchParams.limit as string);
  //   let limit = 6;

  const skip = (page - 1) * limit;

  const totalPages = Math.ceil(allOrderItemsCount! / limit);

  const allOrderItemsArray = await getAllOrder(limit, skip);
  const userIds = allOrderItemsArray?.map((e) => e.userId);

  async function findUsersByIds(userIds: string[]) {
    "use server";

    try {
      const users = await User.find({ _id: { $in: userIds } });

      return users;
    } catch (error) {
      console.error("Error finding users:", error);
      return null;
    }
  }

  const users = (await findUsersByIds(userIds ?? [])) as IUser[];

  return (
    <div className="flex flex-col  items-center justify-center">
      <div className="flex min-h-screen flex-wrap  gap-3 items-center justify-between px-24 pt-24 pb-6">
        {allOrderItemsArray?.map((item) => (
          <Card key={item._id} className="w-[450px] ">
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.category}</CardDescription>
              <CardContent>
                <p>Цена: {item.price}</p>
                <p>Описание: {item.description}</p>
                <p>Дата: {item.date}</p>
              </CardContent>
            </CardHeader>

            <CardFooter className="flex justify-between">
              <p className="font-medium leading-none">
                Заказчик:{" "}
                {`${users.map((item) => item.name)} ${users.map(
                  (item) => item.surname
                )}`}
              </p>
              <Image
                className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full"
                width={35}
                height={35}
                src={`${users.map((item) => item.avatar)}`}
                alt={""}
              />
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex justify-center items-center pb-6">
        <PaginationLimits totalPages={totalPages} />
      </div>
    </div>
  );
};

export default AllOrder;
