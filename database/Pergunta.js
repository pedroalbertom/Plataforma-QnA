// model

// importando o sequelize
const sequelize = require('sequelize')
// importando a funcao da conexão
const connection = require('./database')

// configurando a criação da tabela dentro do db plataformaPerguntas
const Pergunta = connection.define('pergunta', {
    // coluna titulo, recebe uma string e não pode deixar null
    titulo: {
        type: sequelize.STRING,
        allowNull: false
    },
    // coluna descricao, recebe um texto e não pode deixar null
    descricao: {
        type: sequelize.TEXT,
        allowNull: false
    }
})

// force: false faz com que a tabela só seja criada se a tabela ainda nao existir, se já existir, não recria
Pergunta.sync({force: false}).then(() => {console.log("Tabela criada!")})

// exportando a funcao que cria o db
module.exports = Pergunta