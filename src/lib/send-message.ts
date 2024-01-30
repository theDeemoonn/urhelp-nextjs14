'use server'

import Product from "@/models/products";
import { IProduct } from "@/types/IProduct";
import { revalidatePath } from "next/cache";



export async function sendMessage(id: string, data: string, userId: string) {
  
    const time = new Date().toLocaleString();
    const orderItems = (await Product.findOne({ _id: id })
     
    .updateOne({ $push: { comments: { comment: data, time:time, user: userId } } })
    .then((res) => res)) as IProduct;

    revalidatePath(`/products/${id}`);

  if (orderItems) {
    return orderItems;
  }
  return null;

  
  
}
