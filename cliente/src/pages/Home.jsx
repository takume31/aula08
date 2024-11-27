import { useState } from "react";

export default function Registrar() {
 const [nome, setNome] = useState (""); 
 const [email, setEmail] = useState ("");
  const registrar = async (event) => {
  
  event.preventDefault();
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
    }};
  return (
    <main>
      <form action="" onSubmit={registrar}>

      <div className="centraliza">
        <div className="separar">
        <input
        placeholder="Nome"
        type="text"
        value={nome}
        onChange={(event) => setNome(event.target.value)}/>
        </div>

        <div className="separar">
        <input
        className="espacamento"
        placeholder="Email"
        type='email'
        value={email}
        onChange={(event) => setEmail(event.target.value)}/>
        </div>
        <button>Salvar</button>
        </div>
      </form>
    </main>
    );
}