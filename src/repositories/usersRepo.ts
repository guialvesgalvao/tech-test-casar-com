import axios, { AxiosInstance }  from "axios";

export class UsersRepo {
  private readonly api: AxiosInstance = axios.create({
    baseURL: "https://api.github.com/",
  });

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

  async getUsersByText(text: string, quantity: number, page: number) {
    const endpoint = `search/users?q=${text}&per_page=${quantity}&page=${page}`;
    const { data } = await this.api.get(endpoint);

    return data.items ?? [];
  }

  async getUser(username: string) {
    const endpoint = `users/${username}`;
    const { data } = await this.api.get(endpoint);

    return data;
  }
}
