var knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'nova1204',
        database: 'api_app',
        port: 3307
    }
    // connection: {
    //     host: 'db4free.net',
    //     user: 'etecjau070',
    //     password: 'Etec@1234',
    //     database: 'bd_etecjau'
    // }
})

module.exports = knex