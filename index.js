//passar as propriedades do express por meio de variavel usando require()
const express = require('express');

//passar a função do express a vairavel
const server = express();

//fazer com que o express Leia json
server.use(express.json());

//array de usuarios
const users = ['Diego', 'Cláudio', 'João Vitor']

//middleware global
server.use((req , res , next) => {
    console.time(`request`)
    console.log(`Metodo: ${req.method}; URL: ${req.url}`)
    next()
    console.timeEnd(`request`)
})

// criando middleware nao globais
function checkUserExist(req, res,next) {
    if(!req.body.name){
        return res.status(400).json({ error: "user name is required"})
    }

    return next();
};

// criando middleware nao globais de erros em API
function checkUserInArray(req,res,next){
    const user = users[req.params.index];
    if(!users){
        return res.status(400).json({ error: "user does not exists"})
    }
    req.user = user

    return next();
}

//metodo Get de todos os usuarios
server.get('/users',checkUserInArray,(req , res) => {
    return res.json(users)
})

//metodo post para inserção de usuarios
server.post('/users', checkUserExist,(req , res) => {
    const {name} = req.body;

    users.push(name);

    return res.json(users);
});

//metodo put de Edição
server.put('/users/:index', checkUserExist,(req , res) => {
    const { index } = req.params;
    const { name } = req.body;

    users[index] = name;

    return res.json(users);
});

//metodo de deletar usuario
server.delete('/users/:index',checkUserInArray,(req , res) => {
    const { index } = req.params;

    users.splice(index,1);

    return res.send();
});

//metodo get passando parametros
server.get('/users/:index',checkUserInArray,(req , res) => {
    //const nome = req.query.nome;
    //return res.json({message: `Hello ${nome}`})
    return res.json(req.user);
});

//fazer a api rodar na porta 3000 com .listen()
server.listen(3000);

