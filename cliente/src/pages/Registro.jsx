import { useEffect, useState } from "react";
export default function registrar(){
    const [usuarios, setUsuarios] = useState([]);         
    const [gmail, setGmail] = useState([]);
    useEffect(() => {
      const buscarUsuario = async () => {
        try {
          const resposta = await fetch("http://localhost:3000/usuarios");
          const dados = await resposta.json();
          setUsuarios(dados);
          setGmail(dados);
        } catch {
          alert('Ocorreu um erro no app!');
        }
      }
      buscarUsuario();
    }, [])
    return(
        <>
    <table>
        <div className="todos">
        <div className="pagina1">
        <tr>
          <td className="border">Nome</td>
        </tr>
        
        {
            usuarios.map((usuario) =>
                <tr key={usuario.id}>
            
          <div className="separar">
            <td>{usuario.nome}</td>
          </div>
          </tr>
          )}
          </div>
          
        <div className="pagina2">
  
          <tr>
          <td className="border">E-mail</td>
        </tr>
        {
            gmail.map((gmail) =>
                <tr key={gmail.id}>
              
          <div className="separar">
            <td>{gmail.email}</td>
          </div>
          </tr>
        )}
        </div>
        </div>  
      </table>
      <div className="botao">
        <button className="link">
        <a href="http://localhost:5173/">
          Menu
        </a>
          </button>
      </div>
        </>
    )
}
