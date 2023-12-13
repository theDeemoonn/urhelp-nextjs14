import { create } from 'zustand'

export interface IOrder {
  title : string;
  description : string;
  date : string;
  category : string;
  price : number;
}


export const useStore = create<IOrder>((set, get) => ({
    title: "",
    description: "",
    date: "",
    category: "",
    price: 0,
    setOrder: (order: IOrder) => set({ ...order }),
    resetOrder: () => set({ title: "", description: "", date: "", category: "", price: 0 }),
    order: () => get(),
    }))




  

      