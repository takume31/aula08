import { useEffect, useState } from "react";
import 'jspdf-autotable';
import React from 'react';

export default function Home() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        const resposta = await fetch("http://localhost:3000/usuarios");
        const dados = await resposta.json();
        setUsuarios(dados);
      } catch {
        alert('Ocorreu um erro no app!');
      }
    }
    buscarUsuario();
  }, []);

  return (
    <div>
      <table border="1">
        <thead>
          <tr>
            <th>Imagem</th>
            <th>Jogo</th>
            <th>descrição</th>
            <th>Preço</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key= {usuario.id}>
              <td><img src={usuario.imagem} alt={usuario.nome} style={{ width: "50px", height: "50px" }} /></td>
              <td>{usuario.nome}</td>
              <td>{usuario.descricao}</td>
              <td>R$:{usuario.preco}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

}
