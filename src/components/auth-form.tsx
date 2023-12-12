"use client";

import Link from "next/link";

import Image from "next/image";

import { usePathname } from "next/navigation";

import Logo from "../../public/assets/img/logo@2x.webp";

import { Card } from "@/components/ui/card";

import RegisterForm from "./registration-form";
import LoginForm from "./login-form";

const AuthForm = () => {
  const pathname = usePathname();

  return (
    <div className="h-full bg-gradient-to-tl from-white-600 to-indigo-900 w-full py-16 px-4 ">
      <div className="flex flex-col items-center justify-center max-sm:p-5">
        <Image width={96} height={96} src={Logo} alt={""} />
        <Card className="bg-card shadow-xl rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-16 max-sm:p-5">
          {(pathname === "/registration" && (
            <div>
              <p className="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800 dark:text-white  dark:border-gray-700">
                Зарегистрироваться
              </p>

              <p className="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500 dark:text-white  dark:border-gray-700">
                Есть аккаунт?{" "}
                <Link
                  href="/login"
                  className="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none  text-gray-800 dark:text-white  dark:border-gray-700 cursor-pointer"
                >
                  {" "}
                  Войти
                </Link>
              </p>
            </div>
          )) || (
            <div>
              <p className="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800 dark:text-white  dark:border-gray-700">
                Войти
              </p>

              <p className="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500 dark:text-white  dark:border-gray-700">
                Нет аккаунта?{" "}
                <Link
                  href="/registration"
                  className="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none  text-gray-800 dark:text-white  dark:border-gray-700 cursor-pointer"
                >
                  {" "}
                  Зарегистрироваться
                </Link>
              </p>
            </div>
          )}
          {(pathname === "/registration" && <RegisterForm />) || <LoginForm />}
        </Card>
      </div>
    </div>
  );
};

export default AuthForm;
