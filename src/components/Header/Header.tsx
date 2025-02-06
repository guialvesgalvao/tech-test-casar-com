import { HeartIcon } from "@/assets/icons/Heart";
import SearchInput from "../SearchInput/SearchInput";
import { SectionButton } from "../SectionButton/SectionButton";
import { PATHS } from "@/consts/paths";


export function Header() {
    
    return(
        <div className="w-full justify-between items-center border-b-2 border-custom-border mb-6 pl-5 hidden md:flex">
            <SearchInput />
            <SectionButton 
            customClasses="flex h-full"
            title="Favoritos"
            icon={<HeartIcon heigth={16} width={16} color={"#fff"} />}
            href={PATHS.FAVORITES}
             />
        </div>
    )
}