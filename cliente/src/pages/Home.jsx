import { useEffect, useState } from "react";
import Registrar from "./Registro";

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
  }, [])

  return (
    <table>
      <div className="pagina">
      <tr>
        <td>Nome</td>
        <br/>
        <td>E-mail</td>
      </tr>
      {usuarios.map((usuario) =>
        <tr key={usuario.id}>
          <td>{usuario.nome}</td>
          <br/>
          <td>{usuario.email}</td>
        </tr>
      )}
      <Registrar/>
      </div>
    </table>
  );
}