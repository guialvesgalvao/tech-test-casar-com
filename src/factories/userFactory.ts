import { IUser, IUserResponse } from "../interfaces/IUsers";

export function userFactory(user: IUserResponse ): IUser {
  const item: IUser = {
    id: user.id,
    userName: user.login,
    avatarUrl: user.avatar_url,
    name: user.name ?? '',
    bio: user.bio ?? '',
    blog: user.blog,
    company: user.company,
    email: user.email,
    followers: user.followers,
    following: user.following,
  };

  return item;
}
