export default class LoginService {
  constructor() {
    return;
  }

  async signin(repo: string) {
    const response = await fetch(repo);
    const data = await response.json();
    return data;
  }
}
