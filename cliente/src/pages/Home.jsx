import { useEffect, useState } from "react";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import AdfScannerIcon from '@mui/icons-material/AdfScanner';
import { Link } from "react-router-dom";
import React from 'react';
import Loadin from "./Loadn";

export default function Home() {
  const [usuarios, setUsuarios] = useState([]);
  const [listaFiltrada, setListaFiltrada] = useState([]);
  
  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        const resposta = await fetch("http://localhost:3000/usuarios");
        const dados = await resposta.json();
        setUsuarios(dados);
        setListaFiltrada(dados);
      } catch {
        alert('Ocorreu um erro no app!');
      }
    }
    buscarUsuario();
  }, []);

  const deletar = async (id) => {
    try {
      await fetch(`http://localhost:3000/usuarios/${id}`, { method: 'DELETE' });
      setUsuarios(usuarios.filter(usuario => usuario.id !== id));
      setListaFiltrada(listaFiltrada.filter(usuario => usuario.id !== id));
    } catch {
      alert("Ish... lascou!");
    }
  }
  
  const exportarPDF = () => {
    const doc = new jsPDF();
    const tabela = listaFiltrada.map(usuario => [
      usuario.id,
      usuario.imagem,
      usuario.nome,
      usuario.descricao,
      usuario.preco
    ]);

    doc.text("Lista de Usuários", 10, 10);

    doc.autoTable({
      head: [["ID", "Imagem", "Nome", "Descrição", "Preço"]],
      body: tabela,
    });
    
    doc.save("Arquivo_Baixado.pdf");
  }

  const orderAz = () => {
    const listaOrdenada = [...listaFiltrada].sort((a, b) => a.nome.localeCompare(b.nome));
    setListaFiltrada(listaOrdenada);
  };
  const orderZa = () => {
    const listaOrdenada = [...listaFiltrada].sort((a, b) => b.nome.localeCompare(a.nome));
    setListaFiltrada(listaOrdenada);
  };

  const orderPrecoMenor = () => {
    const listaOrdenada = [...listaFiltrada].sort((a, b) => a.preco - b.preco);
    setListaFiltrada(listaOrdenada);
  };

  const orderPrecoMaior = () => {
    const listaOrdenada = [...listaFiltrada].sort((a, b) => b.preco - a.preco);
    setListaFiltrada(listaOrdenada);
  };

  const pesquisarItem = (valor) => {
    const listaFiltrada = usuarios.filter((item) =>
      item.nome.toLowerCase().includes(valor.toLowerCase())
    );
    setListaFiltrada(listaFiltrada);
  };

  if (usuarios.length === 0) {
    return (
      <div className="Centralizar">
        <Loadin/>
      </div>
    );
  }

  return (
    <div className="tudo">
      <div className="todosbotao">
        <button className="click" onClick={orderAz}>Ordenar A-Z</button>
        <button className="click" onClick={orderZa}>Ordenar Z_A</button>
        <button className="click" onClick={orderPrecoMenor}>Preço: Menor - Maior</button>
        <button className="click" onClick={orderPrecoMaior}>Preço: Maior - Menor</button>
      </div>

      <input className="pesquisas" placeholder="Pesquisar" onChange={(e) => pesquisarItem(e.target.value)} />

      <div className="Mutano">
        <div className="barra-branca"> 
          <Link to={'/registros'}><button className="Registro"><strong>Registrar</strong></button></Link>
          <button className="Butao" onClick={exportarPDF}><AdfScannerIcon /></button>
        </div>
      </div>

      <div className="Centralizar">
        <table border="1">
          <thead>
            <tr>
              <th>Imagem</th>
              <th>Jogo</th>
              <th>Descrição</th>
              <th>Preço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {listaFiltrada.map((usuario) => (
              <tr key={usuario.id}>
                <td><img src={usuario.imagem} alt={usuario.nome} style={{ width: "75px", height: "75px" }} /></td>
                <td>{usuario.nome}</td>
                <td>{usuario.descricao.length > 10 ? usuario.descricao.slice(0, 10) + '...' : usuario.descricao}</td>
                <td>R$: {usuario.preco}</td>
                <td>
                  <button className="botao4" onClick={() => deletar(usuario.id)}><strong>Excluir</strong></button>
                  <Link to={`/Alterar/${usuario.id}`}>
                    <button className="botao4"><strong>Editar</strong></button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
