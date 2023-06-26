import { useState } from "react";
import "./style.css";

import { useDispatch } from "react-redux";
import { Card } from "../../components/Card";
import { Header } from "../../components/Header";
import LoginService from "../../services/login.api";
import { Pessoa } from "../../types/pessoa";
import { User } from "../../types/user";
import UserActionTypes from "../../redux/user/action.types";

export function Home() {
  const [name, setName] = useState<string>("");
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);

  const dispatch = useDispatch();

  const handleLoginClick = async () => {
    const response = await new LoginService().signin(
      "https://api.github.com/users/JonatasMSantos"
    );

    const loggedUser: User = {
      name: response.name,
      login: response.login,
      avatar: response.avatar_url,
    };

    dispatch({
      type: UserActionTypes.LOGIN,
      payload: loggedUser,
    });
  };

  const handleLogoutClick = async () => {
    dispatch({
      type: UserActionTypes.LOGOUT,
    });
  };

  function handleAddPessoa() {
    const novaPessoa: Pessoa = {
      name,
      time: new Date().toLocaleDateString("pt-br", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };

    setPessoas((prevState) => [...prevState, novaPessoa]);
  }

  //useEffect(() => {
  //}, []);

  return (
    <div className="container">
      <Header
        title="Lista de presença"
        onLogout={handleLogoutClick}
        onLogin={handleLoginClick}
      ></Header>

      <header></header>

      <input
        type="text"
        placeholder="Digite o nome"
        onChange={(e) => setName(e.target.value)}
      />
      <button type="button" onClick={handleAddPessoa}>
        Adicionar
      </button>

      {pessoas.map((p: Pessoa, index) => (
        <Card key={index} name={p.name} time={p.time} />
      ))}
    </div>
  );
}
