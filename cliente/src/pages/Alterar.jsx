import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Alterar() {
  const { id } = useParams(); // ID do usuário vindo da URL
  const navigate = useNavigate(); // Para redirecionar após a alteração
  const [usuario, setUsuario] = useState({ nome: "", descricao: "", imagem:"", preco:"" });

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
      alert("Jogo atualizado com sucesso!");
      navigate("/"); // Redireciona para a página inicial
    } catch {
      alert("Erro ao atualizar o JOgo.");
    }
  };

  return (
    <div>
      <h1>Alterar Jogo</h1>
      <form>
        <img src={usuario.imagem} alt="Imagem do jogo" style={{while:100, height:100}} />
        <br/>
        <label><strong>Imagem:</strong></label>
        <input
        label="Imagem"
        name="imagem"
        value={usuario.imagem}
        onChange={handleChange}
        />
        <h1>{usuario.nome}</h1>
        <label><strong>Nome:</strong></label>
        <input
          label="Nome"
          name="nome"
          value={usuario.nome}
          onChange={handleChange}
        />  
        <h2>{usuario.descricao}</h2>
        <label><strong>Descrição</strong></label>
        <input
          label="descrição"
          name="descricao"
          value={usuario.descricao}
          onChange={handleChange}
        />
        <h2>R$: {usuario.preco}</h2>
        <label><strong>Preço:</strong></label>
        <input 
        label="Preço"
        name="preco"
        value={usuario.preco}
        onChange={handleChange}
        />
        <br/>

        <div className="botao2">
        <Button variant="contained" onClick={handleSalvar}>Salvar</Button>
        </div>
      </form>
    </div>
  );
}