import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function Registro() {
  const [imagem, setimagem] = useState("");
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const navigation = useNavigate();

  const Registrar = async (event) => {
    event.preventDefault();

    // Basic validation
    if (!imagem || !nome || !descricao) {
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
          descricao: descricao,
          preco: preco
        }),
      });

      if (resposta.ok) {
        navigation("/");
      } else {
        alert("Erro ao registrar O jogo. Tente novamente.");
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
          <label htmlFor="imagem"><strong>Imagem URL:</strong></label>
          <input
            type="url"
            id="imagem"
            value={imagem}
            placeholder="URL da Imagem"
            onChange={(event) => setimagem(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="nome"><strong>Nome:</strong></label>
          <input
            type="text"
            id="nome"
            value={nome}
            placeholder="Nome"
            onChange={(event) => setNome(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="descricao"><strong>Descrição:</strong></label>
          <input
            type="descricao"
            id="descricao"
            value={descricao}
            placeholder="Descrição"
            onChange={(event) => setDescricao(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="preco"><strong>Preço:</strong></label>
          <input
            type="Preco"
            id="Preco"
            value={preco}
            placeholder="Preço"
            onChange={(event) => setPreco(event.target.value)}
          />
        </div>

        <Link to="/"> <button className="botao3" color="primary" type="submit"> Cancelar </button> </Link>
        
        <button className="botao3" color="primary" type="submit"> Registrar </button>

      </form>
    </main>
  );
}