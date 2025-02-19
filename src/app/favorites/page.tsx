"use client";

import { RepositoryList } from "@/components/RepositoryList/RepositoryList";
import { useFavoritesRepos } from "@/stores/useFavoritesRepos";
import NotFoundImage from '../../../public/not-found.png'
import Image from 'next/image'

export default function FavoritesPage() {
  const { favorites } = useFavoritesRepos();
  return (
    <div className="flex justify-center w-full h-full mb-14">
      <div className="mx-auto w-[90%] h-full md:w-[60%]">
        {favorites.length > 0 ? (
          <RepositoryList
            title="Meus Favoritos"
            align="center"
            getMoreRepositories={() => {}}
            hasMore={false}
            repositories={favorites}
            page={1}
          />
        ) : (
          <div className="flex items-center h-full flex-col justify-center">
            <Image width={200} height={200} alt="Página não encontrada" src={NotFoundImage} />
            <h1 className="text-[21px] font-semibold">Nenhum repositório encontrado</h1>
            <p>Navegue pelos perfis dos usuários e favorite os seus repositórios preferidos!</p>
          </div>
        )}
      </div>
    </div>
  );
}
