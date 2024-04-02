// importando o express para a variavel app
const express = require("express")
// inicializando o express
const app = express()
// importando o bodyParser para receber dados p/ o db
const bodyParser = require("body-parser");
// importando a funcao que conecta com o db
const connection = require("./database/database")
// importa a funcao que cria o db
const Pergunta = require("./database/Pergunta")
// importa a funcao que cria o db
const Resposta = require("./database/Resposta")

// conexão com o db
connection
    // autentica a conexão, se der certo printa no console, senão printa uma msg de erro
    .authenticate()
    .then(() => {
        console.log("Conexão estabelecida com sucesso!")
    })
    .catch((msgErro) => {
        console.log(msgErro)
    })

// estou dizendo para o express usar o EJS como View Engine
app.set('view engine', 'ejs')

// estou dizendo para o express usar a pasta public para pegar os arquivos estáticos
app.use(express.static('public'))

// configurando body parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// setando a rota home
app.get("/", (req, res) => {
    // Select all from perguntas, pega só os dados "raw" e ordena por ID
    Pergunta.findAll( {raw: true, order: [
        ['id', 'DESC'] // ASC: crescent DESC: decrescente
    ]}).then(perguntas => {
        res.render("home", {
            // passando as perguntas para a home page
            perguntas: perguntas
        })
    })
})

// setando a rota perguntar
app.get("/perguntar", (req, res) => {
    res.render("perguntar")
})

// setando a rota para salvar a pergunta no db
app.post("/salvarPergunta", (req, res) => {
    // o body parser proporciona esse obj body que pega os dados da pergunta
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect('/perguntar')
    })
})

app.get("/pergunta/:id", (req, res) => {
    let id = req.params.id
    // busca no banco de dados pelo id
    // findone é um método do sequelize que busca um dado através de uma condicao
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){ // pergunta encontrada
            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [['id', 'DESC']]
            }).then(respostas => {
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas
                })
            })
        }else{ // não encontrada
            res.redirect("/")
        }
    })
})

app.post("/responder", (req, res) => {
    let corpo = req.body.corpo
    let perguntaId = req.body.pergunta
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/" + perguntaId)
    })

})

// inicializando o server na rota 50135 e postando no console
app.listen(50135, () => { console.log("App rodando!") })