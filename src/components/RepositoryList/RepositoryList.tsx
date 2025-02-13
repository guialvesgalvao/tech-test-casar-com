"use client";

import { useEffect, useRef, useCallback } from "react";
import { RepositoryCard } from "../RepositoryCard/RepositoryCard";
import { IRepository } from "@/interfaces/IRepository";

interface RepositoryListProps {
  title: string;
  align: "initial" | "center";
  getMoreRepositories: () => void;
  hasMore: boolean;
  repositories: IRepository[];
  page: number;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
}

export function RepositoryList(props: Readonly<RepositoryListProps>) {
  const {
    repositories,
    title,
    align,
    getMoreRepositories,
    hasMore,
    page,
    setPage,
  } = props;
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (setPage) {
      getMoreRepositories();
    }
  }, [page]);

  useEffect(() => {
    return () => {
      observer.current?.disconnect();
    };
  }, []);

  const lastRepositoryRef = useCallback(
    (node: HTMLDivElement) => {
      if (!setPage) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasMore, setPage]
  );

  return (
    <div className="w-full px-4">
      <h3
        className={`${
          align === "center" ? "justify-center" : ""
        } mb-5 text-[21px] flex items-center text-primary font-semibold`}
      >
        {title}
      </h3>
      <div>
        {repositories.map((repo, index) => {
          const isLast = index === repositories.length - 1;
          if (isLast && setPage) {
            return (
              <div key={repo.id} ref={lastRepositoryRef}>
                <RepositoryCard {...repo} />
              </div>
            );
          }
          return <RepositoryCard key={repo.id} {...repo} />;
        })}
      </div>
    </div>
  );
}
