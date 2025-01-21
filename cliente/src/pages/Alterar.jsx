import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function Alterar() {
  const { id } = useParams(); // ID do usuário vindo da URL
  const navigate = useNavigate(); // Para redirecionar após a alteração
  const [usuario, setUsuario] = useState({ nome: "", email: "", imagem:"" });

  // Buscar os dados do usuário ao carregar o componente
  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        const resposta = await fetch(`http://localhost:3000/usuarios/${id}`);
        const dados = await resposta.json();
        setUsuario(dados);
      } catch {
        alert("Erro ao carregar os dados do usuário.");
      }
    };
    buscarUsuario();
  }, [id]);

  // Função para lidar com alterações no formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({ ...prev, [name]: value }));
  };

  // Função para salvar as alterações
  const handleSalvar = async () => {
    try {
      await fetch(`http://localhost:3000/usuarios/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      });
      alert("Usuário atualizado com sucesso!");
      navigate("/"); // Redireciona para a página inicial
    } catch {
      alert("Erro ao atualizar o usuário.");
    }
  };

  return (
    <div>
      <h2>Alterar Usuário</h2>
      <form>
        <input
        label="Imagem"
        name="imagem"
        value={usuario.imagem}
        onChange={handleChange}
        />
        <input
          label="Nome"
          name="nome"
          value={usuario.nome}
          onChange={handleChange}
        />  
        <input
          label="E-mail"
          name="email"
          value={usuario.email}
          onChange={handleChange}
        />
        <Button variant="contained" onClick={handleSalvar}>
        Salvar
        </Button>
      </form>
    </div>
  );
}
