'use client'

import { useState, useEffect, useRef, useCallback } from 'react';
import { formatUpdateDateToString } from "@/helpers/formatUpdateDateToString";
import { RepositoryCard } from "../RepositoryCard/RepositoryCard";
import { IRepository } from "@/interfaces/IRepository";
import { RepoService } from '@/services/repoService';
import { LIMIT_REPO_PER_PAGE } from '@/consts/defaultConfigConsts';

interface RepositoryListProps {
  title: string,
  align: 'initial' | 'center';
  userName: string;
}

export function RepositoryList(props: Readonly<RepositoryListProps>) {
  const { title, align, userName } = props;
  const [repositories, setRepositories] = useState<IRepository[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const repository = new RepoService();

  async function loadRepositories() {
    try {
      const newRepos = await repository.getUserRepos(userName, page);
      setRepositories((prevRepos) => {
        const existingIds = new Set(prevRepos.map((r) => r.id));
        const filtered = newRepos.filter((repo) => !existingIds.has(repo.id));
  
        return [...prevRepos, ...filtered];
      });
  
      if (newRepos.length < LIMIT_REPO_PER_PAGE) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Erro ao carregar repositórios:', error);
    }
  };

  useEffect(() => {
    loadRepositories();
  }, [page]);

  const lastRepositoryRef = useCallback(
    (node: HTMLDivElement) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  return (
    <div className='w-full px-4'>
      <h3 className={`${align === 'center' ? 'justify-center' : ''} mb-5 text-[21px] flex items-center text-primary font-semibold`}>
        {title}
      </h3>
      <div>
        {repositories.map((repo, index) => {
          if (index === repositories.length - 1) {
            return (
              <div key={repo.id} ref={lastRepositoryRef}>
                <RepositoryCard
                  {...repo}
                  lastUpdate={formatUpdateDateToString(repo.updatedAt)}
                />
              </div>
            );
          } else {
            return (
              <RepositoryCard
                key={repo.id}
                {...repo}
                lastUpdate={formatUpdateDateToString(repo.updatedAt)}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
