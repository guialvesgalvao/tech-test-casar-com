import axios from 'axios';
import { IRepositoryResponse } from '../interfaces/IRepository';
import { LIMIT_REPO_PER_PAGE } from '@/consts/defaultConfigConsts';

export class RepositoriesRepo {
    private readonly _quantityPerPage = LIMIT_REPO_PER_PAGE;

    async getUserRepos(username: string, page: number): Promise<IRepositoryResponse[] | null>{
        const endpoint = `https://api.github.com/users/${username}/repos?per_page=${this._quantityPerPage}&page=${page}`
        const { data } = await axios.get(endpoint,{
            headers: {
              Authorization: 'Bearer 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'
            }
           })

        return data
    }
}