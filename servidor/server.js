const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

let usuarios = [];

app.post('/usuarios', (req, res) => {
    const { nome, email, imagem } = req.body;
    
    if (!nome || !email) {
        return res.status(400).json({ erro: 'Nome e email são obrigatórios' });
    }

    const novoUsuario = { id: usuarios.length + 1, nome, email, imagem };
    usuarios.push(novoUsuario);
    
    res.status(201).json(novoUsuario);
});

app.get('/usuarios', (req, res) => {
    res.status(200).json(usuarios);
});

app.get('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const usuario = usuarios.find(u => u.id === parseInt(id));
    
    if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    
    res.status(200).json(usuario);
});

app.put('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { nome, email, imagem } = req.body;
    
    const usuario = usuarios.find(u => u.id === parseInt(id));
    
    if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    usuario.imagem = imagem || usuario.imagem;
    usuario.nome = nome || usuario.nome;
    usuario.email = email || usuario.email;
    
    res.status(200).json(usuario);
});

app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const index = usuarios.findIndex(u => u.id === parseInt(id));
    
    if (index === -1) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    
    usuarios.splice(index, 1);
    res.status(204).send();
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
