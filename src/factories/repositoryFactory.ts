import { IRepository, IRepositoryResponse } from "../interfaces/IRepository";

export function repositoryFactory(repo: IRepositoryResponse, nextPage?: number ): IRepository {
  const item: IRepository = {
    id: repo.id,
    title: repo.name,
    url: repo.url,
    private: repo.private,
    defaultBranch: repo.default_branch,
    description: repo.description,
    language: repo.language,
    fork: repo.fork,
    isFavorite: false,
    watchers: repo.watchers,
    createdAt: new Date(repo.created_at),
    updatedAt: new Date(repo.updated_at),
    nextPage: nextPage
  };

  return item;
}
