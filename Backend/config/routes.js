const livrosRouter = require('../api/livros/route')

module.exports = (server) => {
    server.use('/livros', livrosRouter)

}

