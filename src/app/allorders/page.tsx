import PaginationLimits from "@/components/pagination-limit";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui/pagination";
import { connectMongoDB } from "@/lib/mongodb";
import Product from "@/models/products";

import { IProduct } from "@/types/IProduct";
import { IUser } from "@/types/IUser";

import Link from "next/link";

interface IProductWithUser extends Omit<IProduct, "userId"> {
  userId: IUser;
}

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
      .populate("userId")
      .exec()

      .then((res) => res)) as IProductWithUser[];

    if (allOrderItemsArray) {
      return allOrderItemsArray;
    }
    return null;
  }

  async function getAllOrderCount() {
    const allOrderItemsCount = await (Product.find().countDocuments(
      {}
    ) as Promise<number>);

    if (allOrderItemsCount) {
      return allOrderItemsCount;
    }
    return null;
  }

  const allOrderItemsCount = await getAllOrderCount();
  // const allOrderItemsCount = 45;

  let page = parseInt(lastPage as string, 10);

  let limit = parseInt(searchParams.limit as string, 10);
  // let limit = 6;

  const skip = (page - 1) * limit;

  const totalPages = Math.ceil(allOrderItemsCount! / limit);

  page = !page || page < 1 ? 1 : page;

  const prevPage = page - 1 > 0 ? page - 1 : 1;
  const nextPage = page + 1;
  const isMorePage = page < totalPages - 3;

  const pageNumbers = [];
  const offsetNumber = 3;
  for (let i = page - offsetNumber; i <= page + offsetNumber; i++) {
    if (i >= 1 && i <= totalPages) {
      pageNumbers.push(i);
    }
  }

  const allOrderItemsArray = await getAllOrder(limit, skip);

  return (
    <div className="flex flex-col mb-6 items-center justify-center">
      <div className="flex min-h-screen flex-wrap  gap-3 items-center justify-between sm:px-24 sm:pt-24 px-3 pt-12 pb-6">
        {allOrderItemsArray?.map((item) =>  (
          
          <Card key={item._id} className="sm:w-[450px] w-full">
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle>{item.title}</CardTitle>
                <CardTitle>
                  <Button asChild>
                    <Link key={item._id} href={`/allorders/${item._id}`}>
                      К заказу
                    </Link>
                  </Button>
                </CardTitle>
              </div>
              <CardDescription>{item.category}</CardDescription>
              <CardContent>
                <p>Цена: {item.price}</p>
                <p>Описание: {item.description}</p>
                <p>Дата: {item.date}</p>
              </CardContent>
            </CardHeader>

            <CardFooter className="flex justify-between">
              <p className="font-medium leading-none">
                Заказчик: {item.userId.surname} {item.userId.name}
              </p>

              <Avatar className="h-10 w-10">
                <AvatarImage src={item.userId.avatar} alt="user avatar" />
                <AvatarFallback className="text-xl ">
                  {`${item.userId?.surname?.charAt(0)?.toUpperCase() ?? ""}${
                    item.userId?.name?.charAt(0)?.toUpperCase() ?? ""
                  }`}
                </AvatarFallback>
              </Avatar>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex justify-center items-center pb-6">
        <Pagination>
          <PaginationContent>
            {page !== 1 && (
              <PaginationItem>
                <PaginationPrevious
                  isActive
                  href={`?page=${prevPage}&limit=${limit}`}
                />
              </PaginationItem>
            )}
            {pageNumbers.map((number) => (
              <PaginationItem key={number}>
                <PaginationLink
                  isActive={number === page}
                  href={`?page=${number}&limit=${limit}`}
                >
                  {number}
                </PaginationLink>
              </PaginationItem>
            ))}

            {isMorePage && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {isMorePage && (
              <PaginationItem>
                <PaginationLink href={`?page=${totalPages}`}>
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            )}
            {page !== totalPages && (
              <PaginationItem>
                <PaginationNext
                  isActive
                  href={`?page=${nextPage}&limit=${limit}`}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
      <PaginationLimits />
    </div>
  );
};

export default AllOrder;
