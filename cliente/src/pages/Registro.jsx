import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Registro() {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const navigation = useNavigate();

  const Registrar = async (event) => {
event.preventDefault();
try {
  const resposta = await fetch('http://localhost:3000/usuarios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nome: nome,
      email: email
    })
  });
  if(resposta.ok){
    navigation('/')
  }
} catch (err) {
  alert('Ocorreu um erro na aplicação', err);
}}

  return (
        <>
        <main>
          <form onSubmit={Registrar}>
            <input
            type="text"
            value={nome}
            placeholder="Nome"
            onChange={(event) => setNome(event.target.value)}/>

            <input
            type="text"
            value={email}
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}/>
            <button
            type="submit">Registrar</button>
          </form>
        </main>
        </>
  );
}