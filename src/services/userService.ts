import toast from "react-hot-toast";
import { userFactory } from "../factories/userFactory";
import { IUser, IUserResponse, IUserResult } from "../interfaces/IUsers";
import { UsersRepo } from "../repositories/usersRepo";
import axios from "axios";

export class UserService {
  private readonly repository = new UsersRepo();

  async getUser(username: string): Promise<IUser | null> {
    try {
      const result = await this.repository.getUser(username);
      const user = userFactory(result);

      return user;
    } catch (error) {
      if(axios.isAxiosError(error) && error.status !== 404 ) toast.error('Ocorreu um erro durante a busca do usuário');
      return null;
    }
  }

  async getUsersByText(username: string, quantity: number, page: number) {
    try {
      const result = await this.repository.getUsersByText(username, quantity, page);
      const users: IUserResult[] = result.length > 0 ? result.map((user: IUserResponse) => userFactory(user)) : [];
      
      return {
        hasNext: users.length < quantity,
        users,
      };
      
    } catch (_error) {
      toast.error('Ocorreu um erro ao tentar encontrar usuários com o texto informado')
      return {
        hasNext: false,
        users: []
      };
    }
  }
}
