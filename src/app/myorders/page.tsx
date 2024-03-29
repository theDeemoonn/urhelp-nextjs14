import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import React from 'react'

import Link from "next/link";


import { Button } from '@/components/ui/button';
import { connectMongoDB } from '@/lib/mongodb';
import Product from '@/models/products';
import { IProduct } from '@/types/IProduct';
import User from '@/models/user';
import { IUser } from '@/types/IUser';
import { getServerSession } from 'next-auth/next';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


const MyOrders = async ({
    params,
    searchParams,
  }: {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
  }) => {

    const lastPage = searchParams.page?.[searchParams.page.length - 1] ?? 1;

    const session = await getServerSession();

    async function getAllOrderByUserId(userId: string) {
      "use server";
  
      try {
        const allOrderItemsArray = (await Product.find({ userId: userId })
          .then((res) => res) as IProduct[]);
  
        if (allOrderItemsArray) {
          return allOrderItemsArray;
        }
        return null;
      } catch (error) {
        console.error("Error finding orders:", error);
        return null;
      }
    }

    async function getUser() {
      "use server";
      connectMongoDB();
      const user: IUser | null = await User.findOne({
        email: session?.user?.email,
      });
      if (user) {
        return user;
      }
      return null;
    }
  
    const user = await getUser();

  

  
    async function getAllOrderCount() {
      const allOrderItemsCount =
        await (Product.find().countDocuments({}) as Promise<number>);
  
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

    const allOrderById = await getAllOrderByUserId(user?.id!);


    


  return (
    <div className="flex flex-col mb-6 items-center justify-center">
    <div className="flex min-h-screen flex-wrap  gap-3 items-center justify-between px-24 pt-24 pb-6">
      {allOrderById?.map((item) => (
        <Card key={item._id} className="w-[450px] h-[310px]">
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
              Заказчик:{" "}
              {user?.surname} {user?.name}
            
            </p>
           <Avatar className="h-10 w-10">
                <AvatarImage src={user?.avatar} alt="user avatar" />
                <AvatarFallback className="text-xl ">
                  {`${user?.surname?.charAt(0)?.toUpperCase() ?? ""}${
                    user?.name?.charAt(0)?.toUpperCase() ?? ""
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
  </div>
  )
}

export default MyOrders