"use client";

import { TypeOf, number, object, string } from "zod";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

import React from "react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { toast } from "./ui/use-toast";

const orderSchema = object({
  title: string({ required_error: "Это поле обязательно" })
    .min(10, {
      message: "Не менее 10 символов.",
    })
    .max(20, {
      message: "Не более 20 символов.",
    }),
  category: string().optional(),
  price: number({
    required_error: "Это поле обязательно",
    invalid_type_error: "Неверный тип данных. Введите число.",
  }).min(1, {
    message: "Не менее 1 рубля.",
  }),

  description: string()
    .min(10, {
      message: "Не менее 10 символов.",
    })
    .max(1600, {
      message: "Не более 1600 символов.",
    }),
  date: string().optional(),
});

export type Order = TypeOf<typeof orderSchema>;

const CreateOrderModal = ({ title }: { title: string }) => {
  const [date, setDate] = React.useState<Date>();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Order>({
    resolver: zodResolver(orderSchema),
  });

  const onSubmit = async (data: Order) => {
    const fullData = {
      ...data,
      date: date ? format(date, "dd-MM-yyyy", { locale: ru }) : undefined,
      category: title,
    };

    const res = await fetch("api/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: fullData && JSON.stringify(fullData),
    });
    if (res.ok) {
      toast({
        variant: "success",
        title: "Успешно",
        description: "Вы успешно создали заказ",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Разместить заказ</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Заполните форму и мы найдем подходящего исполнителя
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-8 mt-6" onSubmit={handleSubmit(onSubmit)}>
          <Input
            error={errors.title?.message}
            placeholder="Категория"
            {...register("title")}
          />

          <Input
            error={errors.price?.message}
            placeholder="Цена"
            {...register("price", {
              setValueAs: (value) => {
                return value === "" ? undefined : Number(value);
              },
            })}
          />

          <Textarea
            placeholder="Описание"
            {...register("description")}
            error={errors.description?.message}
          ></Textarea>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? (
                  format(date, "PPP", { locale: ru })
                ) : (
                  <span>Выберите необходимую дату</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                disabled={(day) => day < new Date()}
              />
            </PopoverContent>
          </Popover>

          <Button type="submit">Создать</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOrderModal;
