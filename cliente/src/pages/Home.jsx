import { useEffect, useState } from "react";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Button } from  "@mui/material";
import AdfScannerIcon from '@mui/icons-material/AdfScanner';
import { Link } from "react-router-dom";

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
      usuario.email
    ]);

    doc.text("Lista de Usuários", 10, 10);

    doc.autoTable({
      head: [["id", "Imagem", "Nome", "Email"]],
      body: tabela,
    });

    doc.save("Arquivo_Baixado.pdf");
  }

  return (
    <div>
      <Button variant="contained" onClick={exportarPDF}>
        <AdfScannerIcon />
      </Button>
      <table border="1">
        <thead>
          <tr>
            <th>Imagem</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td><img src={usuario.imagem} alt={usuario.nome} style={{ width: "50px", height: "50px" }} /></td>
              <td>{usuario.nome}</td>
              <td>{usuario.email}</td>
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
