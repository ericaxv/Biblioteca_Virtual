const {Client} = require('pg')

const db = new Client({

    host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: '260180',
        database: 'db'


})

db.connect((err) => {
if(err)
{
console.error('error connection', err.message)
}
else{
console.log('db connected')
}
})





module.exports = db