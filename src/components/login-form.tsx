"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useState } from "react";
import { signIn } from "next-auth/react";

import { TypeOf, object, string } from "zod";
import { useRouter, useSearchParams } from "next/navigation";

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

const loginSchema = object({
  email: string()
    .min(1, "Укажите адрес электронной почты")
    .email("Адрес электронной почты недействителен")
    .trim(),
  password: string()
    .min(1, "Необходим пароль")
    .min(6, "Пароль должен быть больше 6 символов")
    .max(32, "Пароль должен быть меньше 32 символов"),
});

export type LoginInput = TypeOf<typeof loginSchema>;

const LoginForm = () => {
  const [passwordShown, setPasswordShown] = useState(false);

  const searchParams = useSearchParams();

  const callbackURL = searchParams.get("callbackUrl") || "/profile";

  const router = useRouter();

  const { toast } = useToast();

  const formLogin = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitLogin = async (data: LoginInput) => {
    const res = await signIn("credentials", {
      ...data,

      redirect: false,
    });

    if (res && !res.error) {
      toast({
        variant: "success",
        title: "Успешно",
        description: "Вы успешно вошли в систему",
      });

      router.push(callbackURL ? callbackURL : "/profile");
    } else {
      toast({
        variant: "destructive",
        title: "Произошла ошибка",
        description: "Проверьте правильность введенных данных",
        action: <ToastAction altText="Try again">Повторить</ToastAction>,
      });
      console.log(res);
    }
  };

  const handleClickShowPassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <Form {...formLogin}>
      <form
        onSubmit={formLogin.handleSubmit(onSubmitLogin)}
        className="space-y-8 mt-6"
      >
        <FormField
          control={formLogin.control}
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
          control={formLogin.control}
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

        <Button type="submit">Войти</Button>
      </form>
    </Form>
  );
};

export default LoginForm;
