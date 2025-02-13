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
import { useCallback, useState } from "react";
import { IRepository } from "@/interfaces/IRepository";
import { LIMIT_REPO_PER_PAGE } from "@/consts/defaultConfigConsts";
import SearchInput from "@/components/SearchInput/SearchInput";
import { useIsMobile } from "@/hooks/useIsMobile";
import * as motion from "motion/react-client";

export default function UserPage() {
  const { username } = useParams();
  const repository = new RepoService();
  const [hasMore, setHasMore] = useState(true);
  const [repositories, setRepositories] = useState<IRepository[]>([]);
  const [page, setPage] = useState(1);
  const isMobile = useIsMobile();

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user", username],
    queryFn: () => new UserService().getUser(username as string),
  });
  const getMoreRepositories = useCallback(async () => {
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
  }, [page, username, repository]);

  if (user === undefined || isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-96 ">
        <OrbitProgress variant="track-disc" color={"#32C0C6"} speedPlus={2} size="small" />
      </div>
    );
  }

  if (!username || user === null || isError) {
    return (
      <div className="px-5 flex h-full items-center flex-col gap-7 text-center">
        {isMobile && <SearchInput />}
        <SearchFeedback
          searchText={username as string}
          title="Nenhum usuário encontrado"
          subTitle="Verifique se a escrita está correta ou tente novamente"
          url={!isMobile ? NotFound : undefined}
          alt="Usuário não encontrado"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row w-full mt-8 mb-12 px-4">
      {isMobile && (
        <div className="w-full flex justify-center mb-3 px-3">
          <SearchInput />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.3,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="w-full md:w-1/3 mb-5 px-3"
      >
        <UserProfile name={user.name} avatarUrl={user.avatarUrl} bio={user.bio ?? ""} userName={user.userName} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.3,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="w-full md:w-2/3"
      >
        <RepositoryList
          title="Repositórios"
          align="initial"
          getMoreRepositories={getMoreRepositories}
          repositories={repositories}
          hasMore={hasMore}
          page={page}
          setPage={setPage}
        />
      </motion.div>
    </div>
  );
}
