//passar as propriedades do express por meio de variavel usando require()
const express = require('express');

//passar a função do express a vairavel
const server = express();

//fazer com que o express Leia json
server.use(express.json());

//array de usuarios
const users = ['Diego', 'Cláudio', 'João Vitor']

//metodo Get de todos os usuarios
server.get('/users',(req , res) => {
    return res.json(users)
})

//metodo post para inserção de usuarios
server.post('/users',(req , res) => {
    const {name} = req.body;

    users.push(name);

    return res.json(users);
});

//metodo put de Edição
server.put('/users/:index',(req , res) => {
    const { index } = req.params;
    const { name } = req.body;

    users[index] = name;

    return res.json(users);
});

//metodo de deletar usuario
server.delete('/users/:index',(req , res) => {
    const { index } = req.params;

    users.splice(index,1);

    return res.send();
});

//metodo get passando parametros
server.get('/users/:index',(req , res) => {
    //const nome = req.query.nome;
    //return res.json({message: `Hello ${nome}`})
    const { index } = req.params;
    return res.json(users[index]);
});

//fazer a api rodar na porta 3000 com .listen()
server.listen(3000);

