import { IRepository } from "./IRepository";

export interface IUser {
  id: number;
  userName: string;
  avatarUrl: string;
  repos?: IRepository[];
  bio?: string | null;
  email?: string | null;
  name?: string;
  company?: string;
  blog?: string;
  followers?: number;
  following?: number;
}

export interface IUserResponse {
  id: number;
  login: string;
  avatar_url: string;
  bio?: string | null;
  email?: string | null;
  name?: string;
  company?: string;
  blog?: string;
  followers?: number;
  following?: number;
}
