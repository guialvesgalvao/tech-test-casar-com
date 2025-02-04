export interface IRepository {
  id: number;
  title: string;
  private: boolean;
  isFavorite: boolean;
  description: any;
  fork: boolean;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  language: string;
  watchers: number;
  defaultBranch: string;
}

export interface IRepositoryResponse {
  id: number;
  name: string;
  private: boolean;
  description: any;
  fork: boolean;
  url: string;
  created_at: string;
  updated_at: string;
  language: string;
  watchers: number;
  default_branch: string;
}
