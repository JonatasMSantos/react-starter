import { useState, useEffect } from "react";
import "./style.css";

import { Card } from "../../components/Card";
import { Pessoa } from "../../types/pessoa";

export function Home() {
  const [name, setName] = useState<string>("");
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [user, setUser] = useState({ name: "", avatar: "" });

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

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://api.github.com/users/JonatasMSantos"
      );
      const data = await response.json();
      setUser({
        name: data.name,
        avatar: data.avatar_url,
      });
    }

    fetchData();
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Lista de presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de Perfil" />
        </div>
      </header>

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
