"use client";

import Image from "next/image";

interface UserProfileProps {
  userName: string;
  name: string;
  bio: string;
  avatarUrl: string;
}

export function UserProfile(props: Readonly<UserProfileProps>) {
  const { name, userName, bio, avatarUrl } = props;

  return (
    <div className="flex p-2 items-center flex-col border w-full rounded-lg">
      <div className=" w-full flex flex-row items-center md:flex-col">
        <div className="relative w-[50px] h-[50px] md:w-[200px] md:h-[200px]">
          <Image
            src={avatarUrl}
            alt={`Avatar de ${name}`}
            fill
            className="rounded-full object-cover"
            sizes="(max-width: 768px) 50px, 200px"
          />
        </div>

        <div className="flex items-start md:items-center  flex-col ml-3 md:ml-0 gap-1 mt-3 mb-5">
          <span className=" font-semibold text-[21px] text-grey-neutral">
            {name}
          </span>
          <span className="text-grey-dark text-sm ">@{userName}</span>
        </div>
      </div>
      <p className="text-grey-dark text-sm">{bio}</p>
    </div>
  );
}
