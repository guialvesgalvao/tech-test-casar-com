export interface IRepository {
  id: number;
  title: string;
  private: boolean;
  isFavorite: boolean;
  description: string;
  owner: string;
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
  owner: { login: string }
}

export interface IAttach {
  id: string;
  name: string;
  path: string;
  url: string;
  type: IAttachType;
  content?: string;
}

export interface IAttachResult {
  sha: string;
  name: string;
  path: string;
  url: string;
  type: IAttachType;
  content?: string;
}

export enum IAttachType {
  File = "file", 
  Folder = "dir"  
}