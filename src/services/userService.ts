import { userFactory } from "../factories/userFactory";
import { IUser, IUserResponse, IUserResult } from "../interfaces/IUsers";
import { UsersRepo } from "../repositories/usersRepo";

export class UserService {
  private readonly repository = new UsersRepo();

  async getUser(username: string): Promise<IUser | null> {
    try {
      const result = await this.repository.getUser(username);
      const user = userFactory(result);

      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getUsersByText(username: string, quantity: number, page: number) {
    const result = await this.repository.getUsersByText(username, quantity, page);

    const users: IUserResult[] = result.length > 0 ? result.map((user: IUserResponse) => userFactory(user)) : [];

    return {
      hasNext: users.length < quantity,
      users,
    };
  }
}
