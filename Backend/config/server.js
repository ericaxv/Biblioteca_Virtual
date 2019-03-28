const port = 7000
const bodyParser = require('body-parser')
const express = require('express')
const server = express()
const queryParser = require('express-query-int')
const allowCors = require('./cors')

server.use(bodyParser.urlencoded({extended : true}))
server.use(bodyParser.json())
server.use(allowCors)
server.use(queryParser())
server.use(express.static('public'))
server.use('/uploads', express.static('uploads'))



server.listen(port, function(){
console.log(`Servidor rodando na ${port}.`)

})


module.exports = server