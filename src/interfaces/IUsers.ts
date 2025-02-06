import { IRepository } from "./IRepository";

export interface IUser extends IUserResult {
  repos?: IRepository[];
  bio: string;
  email?: string | null;
  name: string;
  company?: string;
  blog?: string;
  followers?: number;
  following?: number;
}
export interface IUserResult {
  id: number;
  userName: string;
  avatarUrl: string;
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
