import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function Registro() {
  const [imagem, setimagem] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const navigation = useNavigate();

  const Registrar = async (event) => {
    event.preventDefault();

    // Basic validation
    if (!imagem || !nome || !email) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const resposta = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imagem: imagem,
          nome: nome,
          email: email
        }),
      });

      if (resposta.ok) {
        navigation("/");
      } else {
        alert("Erro ao registrar usuário. Tente novamente.");
      }
    } catch (err) {
      alert("Ocorreu um erro na aplicação. Tente novamente mais tarde.");
      console.error(err);
    }
  };

  return (
    <main>
      <form onSubmit={Registrar}>
        <div>
          <label htmlFor="imagem">Imagem URL</label>
          <input
            type="url"
            id="imagem"
            value={imagem}
            placeholder="URL da Imagem"
            onChange={(event) => setimagem(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            value={nome}
            placeholder="Nome"
            onChange={(event) => setNome(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <Link to="/"> <Button variant="contained" color="primary" type="submit"> Cancelar </Button>   </Link>
        
        <Button variant="contained" color="primary" type="submit"> Registrar </Button>

      </form>
    </main>
  );
}
