"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

function ChatBubble({
  avatar,
  userName,
  time,
    text,
    dir,
}: {
  avatar: string;
  userName: string;
  time: string;
    text: string;
    dir: string;
}) {
  return (
    <div dir={dir} className="flex items-start gap-2.5">
      <Avatar className="h-8 w-8">
        <AvatarImage src={avatar} alt="user avatar" />
        {/* <AvatarFallback className="text-xl ">
                  {`${user.surname?.charAt(0)?.toUpperCase() ?? ""}${
                    user.name?.charAt(0)?.toUpperCase() ?? ""
                  }`}
                </AvatarFallback> */}
      </Avatar>
      <div className="flex flex-col gap-1 w-full max-w-[320px]">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {userName}
          </span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            {time}
          </span>
        </div>
        <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
          <p className="text-sm font-normal text-gray-900 dark:text-white"> {text}</p>
        </div>
      </div>
    </div>
  );
}
export default ChatBubble;
