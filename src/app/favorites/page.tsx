"use client"

import { RepositoryList } from "@/components/RepositoryList/RepositoryList";
import { useFavoritesRepos } from "@/stores/useFavoritesRepos";

export default function FavoritesPage() {

  const { favorites } = useFavoritesRepos();

  return (
    <div className="flex justify-center w-full">
      <div className="mx-auto w-[90%] md:w-[60%]">
        <RepositoryList 
          title="Meus Favoritos"
          align="center" 
          getMoreRepositories={() => {} } 
          hasMore={false} 
          repositories={favorites} 
          page={1}      
          />
      </div>
    </div>
  );
}
