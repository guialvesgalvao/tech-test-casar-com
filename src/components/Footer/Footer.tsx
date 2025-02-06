"use client";

import { SectionButton } from "../SectionButton/SectionButton";
import { UserIcon } from "@/assets/icons/User";
import { usePathname } from "next/navigation";
import { PATHS } from "@/consts/paths";
import { HeartFilledIcon } from "@/assets/icons/HeartFilled";

export function Footer() {

  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full h-16 bg-white border-t border-gray-200 z-50">
      <div className="h-full flex flex-row">
        <SectionButton
          customClasses="w-full flex items-center justify-center h-full"
          icon={<UserIcon color={PATHS.FAVORITES !== pathname ? "#fff" : "#32C0C6"} />}
          isSelected={PATHS.FAVORITES !== pathname}
          href={PATHS.HOME}
        />
        <SectionButton
          customClasses="w-full flex items-center justify-center h-full"
          icon={<HeartFilledIcon heigth={16} width={16} color={PATHS.FAVORITES === pathname ? "#fff" : "#32C0C6"} />}
          isSelected={PATHS.FAVORITES === pathname}
          href={PATHS.FAVORITES}
        />
      </div>
    </div>
  );
}
