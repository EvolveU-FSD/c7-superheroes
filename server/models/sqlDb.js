const sqlite = require('sqlite3')
const doAsync = require('doasync')

const connectionString = 'superheroes.sqlite'

let db = new sqlite.Database(connectionString)
let asyncDb = doAsync(db)
module.exports = asyncDb
