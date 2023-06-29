import { User } from "../types/user";

export default class LoginService {
  constructor() {
    return;
  }

  async signin(): Promise<User> {
    const repo = "https://api.github.com/users/JonatasMSantos";

    const response = await fetch(repo);
    const data = await response.json();

    const loggedUser: User = {
      name: data.name,
      login: data.login,
      avatar: data.avatar_url,
    };

    return loggedUser;
  }
}
