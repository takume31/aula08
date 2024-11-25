import { useState } from "react";

export default function Registrar() {
 const [nome, setNome] = useState ("");
 const [email, setEmail] = useState ("");
  event.preventDefault();
  const registrar = async (event) => {
    try{
      await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: nome,
          email: email
          })
      })
    } catch{
      alert("Ocorreu um erro na aplicação")
    }}

  return (
    <main>
      <form action="" onSubmit={registrar}>
        
        <input
        className="espacamento"
        placeholder="Nome"
        type="text"
        value={nome}
        onChange={(event) => setNome(event.target.value)}/>
        
        <input
        className="espacamento"
        placeholder="Email"
        type="emai"
        value={email}
        onChange={(event) => setEmail(event.target.value)}/>

        <button>Salvar</button>
      </form>
    </main>
    );
}