"use client";

import { SearchFeedback } from "@/components/SearchFeedback/SearchFeedback";
import SearchUser from "../../public/search-user.png";
import SearchInput from "@/components/SearchInput/SearchInput";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function Home() {
  const isMobile = useIsMobile();

  return (
    <div className="h-full flex flex-col gap-0 md:gap-10 px-9 md:px-5 text-start md:text-center items-center justify-start md:justify-center">
      <SearchFeedback
        title="Procure pelo Nome ou Nome de Usuário"
        subTitle="Encontre os repositórios de algum usuário digitando no campo acima"
        url={!isMobile ? SearchUser : undefined}
        alt="Procure por um usuário"
      />
      {isMobile && <SearchInput />}
    </div>
  );
}
