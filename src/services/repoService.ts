import { repositoryFactory } from "../factories/repositoryFactory";
import { IRepositoryResponse } from "../interfaces/IRepository";
import { RepositoriesRepo } from "../repositories/repositoriesRepo";

export class RepoService {
  private readonly repository = new RepositoriesRepo();

  async getUserRepos(username: string, page: number) {
    const result = await this.repository.getUserRepos(username, page);
    const repositories =
      result && result.length > 0 ? result.map((repo: IRepositoryResponse) => repositoryFactory(repo, result.length === 10 ? page + 1 : undefined)) : [];

    return repositories;
  }
}
