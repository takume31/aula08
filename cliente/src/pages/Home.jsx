import { useEffect, useState } from "react";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Button } from  "@mui/material";
import AdfScannerIcon from '@mui/icons-material/AdfScanner';
import { Link } from "react-router-dom";
import React from 'react';
import Alterar from "./alterar";

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

  const deletar = async(id) => {
    try {
      await fetch('http://localhost:3000/usuarios/' + id, { method: 'DELETE' });
      setUsuarios(usuarios.filter(usuario => usuario.id !== id));
    } catch {
      alert("Ish... lascou!");
    }
  }

  const exportarPDF = () => {
    const doc = new jsPDF();
    const tabela = usuarios.map(usuario => [
      usuario.id,
      usuario.imagem,
      usuario.nome,
      usuario.descricao,
      usuario.preco
    ]);

    doc.text("Lista de Usuários", 10, 10);

    doc.autoTable({
      head: [["id", "Imagem", "Nome", "Descrição", "preco"]],
      body: tabela,
    });

    doc.save("Arquivo_Baixado.pdf");
  }

  const TextoComLimite = ({ texto, limite }) => {
    // Verifica se o texto excede o limite
    const textoLimitado = texto.length > limite ? texto.slice(0, limite) + '...' : texto;
  
    return <p>{textoLimitado}</p>;
  };
  
  return (
    <div>
      <Button variant="contained" onClick={exportarPDF}>
        <AdfScannerIcon />
      </Button>
      <table border="1">
        <thead>
          <tr>
            <th>Imagem</th>
            <th>Jogo</th>
            <th>descrição</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody> 
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td><img src={usuario.imagem} alt={usuario.nome} style={{ width: "75px", height: "75px" }} /></td>
              <td>{usuario.nome}</td>
              <td><TextoComLimite texto={usuario.descricao} limite={25}/></td>
              <td>R$: {usuario.preco}</td>
              <td>
                <Button variant="contained" color="secondary" onClick={() => deletar(usuario.id)}>X</Button>
                <Link to={'/Alterar/' + usuario.id}>
                  <Button variant="outlined" color="primary">Alterar</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={'/registros'}><button>Reguistrar</button></Link>
    </div>
  );

}
