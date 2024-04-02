// importando o sequelize
const sequelize = require('sequelize')

// configurando o sequelize para se conectar com o banco
const connection = new sequelize('plataformaPerguntas', 'root', '951550784', {
    host: 'localhost',
    dialect: 'mysql'
})

// exportando a funcao
module.exports = connection