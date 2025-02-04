import { HeartIcon } from "@/assets/icons/Heart";
import SearchInput from "../SearchInput/SearchInput";
import { SectionButton } from "../SectionButton/SectionButton";


export function Header() {
    
    return(
        <div className="w-full flex justify-between">
            <SearchInput />
            <SectionButton 
            title="Favoritos"
            icon={<HeartIcon heigth={16} width={16} color={"#fff"} />}
            href="favorites"
             />
        </div>
    )
}