import { formatUpdateDateToString } from "@/helpers/formatUpdateDateToString";
import { IAttach, IAttachResult, IRepository, IRepositoryResponse } from "../interfaces/IRepository";

export function repositoryFactory(
  repo: IRepositoryResponse,
  nextPage?: number
): IRepository {
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
    owner: repo.owner.login,
    watchers: repo.watchers,
    createdAt: new Date(repo.created_at),
    updatedAt: formatUpdateDateToString(new Date(repo.updated_at))
  };

  return item;
}

export function repositoryContentFactory(repoContent: IAttachResult, fileContent?: string): IAttach {
  const item: IAttach = {
    id: repoContent.sha,
    path: repoContent.path,
    name: repoContent.name,
    type: repoContent.type,
    url: repoContent.url,
    content: fileContent ?? repoContent.content
  }

  return item
}
