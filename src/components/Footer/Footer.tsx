import { HeartIcon } from "@/assets/icons/Heart";
import { SectionButton } from "../SectionButton/SectionButton";
import { UserIcon } from "@/assets/icons/User";

export function Footer() {
    
    const currentPage = 'favorites'

    return(
        <div className="w-full flex flex-row">
            <SectionButton 
            icon={<UserIcon />}
            isSelected={true}
            href="search"
             />
            <SectionButton 
            icon={<HeartIcon heigth={16} width={16} color={"#fff"} />}
            isSelected={false}
            href="favorites"
             />
        </div>
    )
}