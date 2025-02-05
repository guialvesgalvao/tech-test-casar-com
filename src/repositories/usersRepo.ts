import axios from 'axios'; 

export class UsersRepo {
  async getUsersByText(text: string, quantity: number, page: number) {
    const endpoint = `https://api.github.com/search/users?q=${text}&per_page=${quantity}&page=${page}`;
    const { data } = await axios.get(endpoint, {
      headers: {
        Authorization: 'Bearer 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'
      }
     })

    return data.items ?? [] 
  }

  async getUser(username: string) {
     const endpoint = `https://api.github.com/users/${username}`
     const { data } = await axios.get(endpoint,{
      headers: {
        Authorization: 'Bearer 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'
      }
     })

     return data
  }
}
