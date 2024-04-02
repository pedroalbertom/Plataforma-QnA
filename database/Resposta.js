// model

// importando o sequelize
const sequelize = require('sequelize')
// importando a funcao da conexão
const connection = require('./database')

// configurando a criação da tabela dentro do db plataformaPerguntas
const Resposta = connection.define('respostas', {
    // coluna corpo, recebe uma string e não pode deixar null
    corpo: {
        type: sequelize.TEXT,
        allowNull: false
    },
    // coluna pergunta
    perguntaId: {
        type: sequelize.INTEGER,
        allowNull: false
    }
})

// force: false faz com que a tabela só seja criada se a tabela ainda nao existir, se já existir, não recria
Resposta.sync({force: false}).then(() => {console.log("Tabela criada!")})

// exportando a funcao que cria o db
module.exports = Resposta