"use client"

import { HeartIcon } from "@/assets/icons/Heart";
import { SectionButton } from "../SectionButton/SectionButton";
import { UserIcon } from "@/assets/icons/User";
import { usePathname } from "next/navigation";
import { PATHS } from "@/consts/paths";

export function Footer() {
    
    const pathname = usePathname();

    return(
        <div className="w-full flex flex-row">
            <SectionButton
            customClasses={'w-full flex items-center justify-center'} 
            icon={<UserIcon color={PATHS.HOME === pathname ? "#fff" : "#32C0C6"}/>}
            isSelected={PATHS.HOME === pathname}
            href={PATHS.HOME}
            />
            <SectionButton 
            customClasses={'w-full flex items-center justify-center'}   
            icon={<HeartIcon heigth={16} width={16} color={PATHS.FAVORITES === pathname ? "#fff" : "#32C0C6"} />}
            isSelected={PATHS.FAVORITES === pathname}
            href={PATHS.FAVORITES}
             />
        </div>
    )
}