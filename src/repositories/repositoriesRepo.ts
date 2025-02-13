import axios, { AxiosInstance } from "axios";
import { IRepositoryResponse } from "../interfaces/IRepository";
import { LIMIT_REPO_PER_PAGE } from "@/consts/defaultConfigConsts";

export class RepositoriesRepo {
  private readonly api: AxiosInstance = axios.create({
    baseURL: "https://api.github.com/",
  });
  private readonly _quantityPerPage = LIMIT_REPO_PER_PAGE;

  constructor() { 
    this.api.interceptors.request.use(
      (config) => {
        const token = process.env.GITHUB_TOKEN;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(new Error(error.message))
    );
  }

  async getUserRepos(
    username: string,
    page: number,
  ): Promise<IRepositoryResponse[] | null> {
    const endpoint = `users/${username}/repos?per_page=${this._quantityPerPage}&page=${page}`;
    const { data } = await this.api.get(endpoint);

    return data;
  }
}
