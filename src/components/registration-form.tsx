"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useState } from "react";

import { TypeOf, object, string } from "zod";

import { useRouter } from "next/navigation";


import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";

const registerSchema = object({
  email: string()
    .min(1, "Укажите адрес электронной почты")
    .email("Адрес электронной почты недействителен")
    .trim(),
  password: string()
    .min(1, "Необходим пароль")
    .min(6, "Пароль должен быть больше 6 символов")
    .max(32, "Пароль должен быть меньше 32 символов"),
  surname: string().min(1, "Требуется фамилия").trim(),
  name: string().min(1, "Требуется имя ").trim(),
  age: string().min(1, "Укажите возраст").max(100, "Укажите возраст"),
  phone: string()
    .min(1, "Укажите номер телефона")
    .regex(/^\+?[0-9]{10,14}$/, "Номер телефона недействителен")
    .trim(),
  description: string().max(1000, "Максимум 1000 символов"),
});

export type RegisterInput = TypeOf<typeof registerSchema>;

const RegisterForm = () => {
  const [passwordShown, setPasswordShown] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      surname: "",
      name: "",
      age: "",
      phone: "",
      description: "",
    },
  });

  const onSubmit = async (data: RegisterInput) => {
    try {
      const resUserExists = await fetch("api/user-exists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const { user } = await resUserExists.json();

      if (user) {
        toast({
          variant: "destructive",
          title: "Произошла ошибка при регистрации",
          description: "Пользователь с таким email уже существует",
          action: <ToastAction altText="Try again">Повторить</ToastAction>,
        });
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast({
          variant: "success",
          title: "Успешно",
          description: "Вы успешно зарегистрировались",
        });
        setTimeout(() => {
          router.push("/create");
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickShowPassword = () => {
    setPasswordShown(!passwordShown);
  };



  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Электронная почта</FormLabel>
              <FormControl>
                <Input placeholder="Электронная почта" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input
                  placeholder="Пароль"
                  type={passwordShown ? "text" : "password"}
                  {...field}
                />
              </FormControl>
              <FormDescription
                className="justify-end flex cursor-pointer text-[10px]"
                onClick={handleClickShowPassword}
              >
                показать пароль
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="surname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Фамилия</FormLabel>
              <FormControl>
                <Input placeholder="Фамилия" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя</FormLabel>
              <FormControl>
                <Input placeholder="Имя" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Возраст</FormLabel>
              <FormControl>
                <Input placeholder="Возраст" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Номер телефона</FormLabel>
              <FormControl>
                <Input placeholder="Номер телефона" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <Input placeholder="Описание" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Регистрация</Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
