import { connectMongoDB } from "@/lib/mongodb";
import { phoneFormatDash } from "@/lib/phone-number";
import User from "@/models/user";
import { IUser } from "@/types/IUser";
import Image from "next/image";
import { getServerSession } from "next-auth/next";
import avatar from "../../../public/assets/img/avatar.png";
import { Card } from "@/components/ui/card";

import ProfileEditModal from "@/components/edit-profile";
import AccountDeleteButton from "@/components/account-delete-button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Profile = async () => {
  const session = await getServerSession();

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

  return (
    <div className="flex flex-col items-center justify-center p-24">
      <h1 className="focus:outline-none text-4xl font-extrabold leading-6 text-gray-800 dark:text-white  dark:border-gray-700">
        Профиль
      </h1>
      <Card className="bg-card shadow-xl rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-16 max-sm:p-5">
        <div className="flex justify-center py-2 items-center rounded-full">
          <Avatar className="h-40 w-40">
            <AvatarImage src={user?.avatar} alt="user avatar" />
            <AvatarFallback className="text-7xl ">
              {`${user?.surname?.charAt(0)?.toUpperCase() ?? ""}${
                user?.name?.charAt(0)?.toUpperCase() ?? ""
              }`}
            </AvatarFallback>
          </Avatar>
        </div>
        {user && (
          <div>
            <dl>
              <div className="bg-card px-3 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-800 dark:text-white">
                  ФИО
                </dt>
                <dd className="mt-1 text-sm text-gray-800 dark:text-white sm:col-span-2 sm:mt-0">
                  {user.surname} {user.name}
                </dd>
              </div>
              <Separator />
              <div className="bg-card px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-800 dark:text-white">
                  Телефон
                </dt>
                <dd className="mt-1 text-sm text-gray-800 dark:text-white sm:col-span-2 sm:mt-0">
                  {phoneFormatDash(String(user?.phone))}
                </dd>
              </div>
              <Separator />
              <div className="bg-card px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-800 dark:text-white">
                  Email
                </dt>
                <dd className="mt-1 text-sm text-gray-800 dark:text-white sm:col-span-2 sm:mt-0">
                  {user.email}
                </dd>
              </div>
              <Separator />
              <div className="bg-card px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-800 dark:text-white">
                  Возраст
                </dt>
                <dd className="mt-1 text-sm text-gray-800 dark:text-white sm:col-span-2 sm:mt-0">
                  {user.age}
                </dd>
              </div>
              <Separator />
              <div className="bg-card px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-800 dark:text-white">
                  О себе
                </dt>
                <dd className="mt-1 text-sm text-gray-800 dark:text-white sm:col-span-2 sm:mt-0">
                  {user.description}
                </dd>
              </div>
              <Separator />
              <div className="bg-card px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                <dd className="mt-1 text-sm text-gray-800 dark:text-white sm:col-span-2 sm:mt-0">
                  <ul role="list">
                    <li className="flex items-center justify-end py-3 pl-3 pr-4 text-sm">
                      <div className="ml-4 flex-shrink-0">
                        <ProfileEditModal />
                      </div>
                    </li>
                    <li className="flex items-center justify-end py-3 pl-3 pr-4 text-sm">
                      <AccountDeleteButton />
                    </li>
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Profile;
