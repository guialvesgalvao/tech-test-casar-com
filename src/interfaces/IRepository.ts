export interface IRepository {
  id: number;
  title: string;
  private: boolean;
  isFavorite: boolean;
  description: string;
  fork: boolean;
  url: string;
  createdAt: Date;
  updatedAt: string;
  language: string;
  watchers: number;
  defaultBranch: string;
  nextPage?: number;
}

export interface IRepositoryResponse {
  id: number;
  name: string;
  private: boolean;
  description: string;
  fork: boolean;
  url: string;
  created_at: string;
  updated_at: string;
  language: string;
  watchers: number;
  default_branch: string;
}
