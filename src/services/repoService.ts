import axios from "axios";
import { repositoryContentFactory, repositoryFactory } from "../factories/repositoryFactory";
import { IAttach, IAttachResult, IAttachType, IRepositoryResponse } from "../interfaces/IRepository";
import { RepositoriesRepo } from "../repositories/repositoriesRepo";
import toast from "react-hot-toast";
import { Base64 } from "js-base64";
export class RepoService {
  private readonly repository = new RepositoriesRepo();

  async getUserRepos(userName: string, page: number) {
    try {
      const result = await this.repository.getUserRepos(userName, page);
      const repositories =
        result && result.length > 0 ? result.map((repo: IRepositoryResponse) => repositoryFactory(repo)) : [];

      return repositories;
    } catch (error) {
      if (axios.isAxiosError(error) && error.status !== 404) toast.error("Ocorreu um erro durante a busca do usuário");
      return [];
    }
  }

  async getRootContent(userName: string, repoName: string, path?: string) {
    try {
      const result = await this.repository.getFolderContent(userName, repoName, path);

      const files =
        result && result.length > 0
          ? result.map((repoContent: IAttachResult) => repositoryContentFactory(repoContent))
          : null;

      return files;
    } catch (error) {
      if (axios.isAxiosError(error) && error.status !== 404)
        toast.error("Ocorreu um erro durante a busca de arquivos do repositório");
      return null;
    }
  }

  async getFileContent(userName: string, repoName: string, filePath: string): Promise<IAttach | null> {
    try {
      const result: IAttachResult = await this.repository.getFileCode(userName, repoName, filePath);
    
      const fileContentDecoded = Base64.decode(result.content ?? "");
      const files = result && repositoryContentFactory(result, fileContentDecoded);

      return files;
    } catch (error) {
      if (axios.isAxiosError(error) && error.status !== 404)
        toast.error("Ocorreu um erro durante a busca de arquivos do repositório");
      return null;
    }
  }

  getFileType(paths: string[]): IAttachType {
    const lastPath = paths[paths.length - 1];

    const fileRegex = /\.[^./\\]+$/;
    const isFile = lastPath ? fileRegex.test(lastPath) : false;

    return isFile ? IAttachType.File : IAttachType.Folder;
  }

  getStringFilePath(repoPaths: string | string[]): string {
    if (!Array.isArray(repoPaths)) return repoPaths;

    const urlPath = repoPaths.join("/");

    return urlPath;
  }
}
