import axios from "axios";
import { repositoryFactory } from "../factories/repositoryFactory";
import { IRepositoryResponse } from "../interfaces/IRepository";
import { RepositoriesRepo } from "../repositories/repositoriesRepo";
import toast from "react-hot-toast";

export class RepoService {
  private readonly repository = new RepositoriesRepo();

  async getUserRepos(username: string, page: number) {
    try {
      const result = await this.repository.getUserRepos(username, page);
      const repositories =
        result && result.length > 0
          ? result.map((repo: IRepositoryResponse) =>
              repositoryFactory(
                repo,
                result.length === 10 ? page + 1 : undefined,
              ),
            )
          : [];

      return repositories;
    } catch (error) {
      if (axios.isAxiosError(error) && error.status !== 404)
        toast.error("Ocorreu um erro durante a busca do usuário");
      return [];
    }
  }
}
