"use client";

import { RepositoryList } from "@/components/RepositoryList/RepositoryList";
import { SearchFeedback } from "@/components/SearchFeedback/SearchFeedback";
import { UserService } from "@/services/userService";
import { useParams } from "next/navigation";
import NotFound from "../../../../public/not-found.png";
import { useQuery } from "@tanstack/react-query";
import { UserProfile } from "@/components/UserProfile/UserProfile";
import { OrbitProgress } from "react-loading-indicators";
import { RepoService } from "@/services/repoService";
import { useState } from "react";
import { IRepository } from "@/interfaces/IRepository";
import { LIMIT_REPO_PER_PAGE } from "@/consts/defaultConfigConsts";


export default function UserPage() {
  const { username } = useParams();
  const repository = new RepoService();
  const [hasMore, setHasMore] = useState(true);
  const [repositories, setRepositories] = useState<IRepository[]>([]);
  const [page, setPage] = useState(1);

  const { data: user, isLoading } = useQuery({
    queryKey: ["user", username],
    queryFn: () => new UserService().getUser(username as string),
  });

  async function getMoreRepositories() {
    try {
      const newRepos = await repository.getUserRepos(username as string, page);
      setRepositories((prevRepos) => {
        const existingIds = new Set(prevRepos.map((r) => r.id));
        const filtered = newRepos.filter((repo) => !existingIds.has(repo.id));

        return [...prevRepos, ...filtered];
      });

      if (newRepos.length < LIMIT_REPO_PER_PAGE) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Erro ao carregar repositórios:", error);
    }
  }

  if (user === undefined || isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-96 ">
        <OrbitProgress variant="track-disc" color={"#32C0C6"} speedPlus={2} size="small" />;
      </div>
    );
  }

  if (!username || user === null) {
    return (
      <div>
        <SearchFeedback
          searchText={username as string}
          title="Nenhum usuário encontrado"
          subTitle="Verifique se a escrita está correta ou tente novamente"
          url={NotFound}
          alt="User not found"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row w-full mt-8 px-4">
      <div className="w-full md:w-1/3">
        <UserProfile name={user.name} avatarUrl={user.avatarUrl} bio={user.bio} userName={user.userName} />
      </div>

      <div className="w-full md:w-2/3">
        <RepositoryList 
        title="Repositórios" 
        align="initial" 
        getMoreRepositories={getMoreRepositories}
        repositories={repositories}
        hasMore={hasMore}
        page={page}
        setPage={setPage}
        />
      </div>
    </div>
  );
}
