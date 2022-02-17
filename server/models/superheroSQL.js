let db = require('./SQLDb')
let doAsync = require('doasync')

let asyncDb = doAsync(db)
async function findAll() {
  const rows = await asyncDb.all(
    'select name, nickname, alterego, sidekick from superhero'
  )
  return rows
}

async function findById(id) {
  return asyncDb.get(
    'select id as _id, name, nickname, alterego, sidekick from superhero where id=' +
      id
  )
}

function asSqlConstant(value) {
  return value ? "'" + value + "'" : 'NULL'
}

async function create(superheroToCreate) {
  let insertSql =
    'insert into superhero (name, nickname, alterego, sidekick) ' +
    'values (' +
    asSqlConstant(superheroToCreate.name) +
    ',' +
    asSqlConstant(superheroToCreate.nickname) +
    ',' +
    asSqlConstant(superheroToCreate.alterego) +
    ',' +
    asSqlConstant(superheroToCreate.sidekick) +
    ')'

  return asyncDb.run(insertSql)
}

async function update(id, superheroToUpdate) {
  let updateSql =
    'update superhero set ' +
    ' name=' +
    asSqlConstant(superheroToUpdate.name) +
    ',' +
    ' nickname=' +
    asSqlConstant(superheroToUpdate.nickname) +
    ',' +
    ' alterego=' +
    asSqlConstant(superheroToUpdate.alterego) +
    ',' +
    ' sidekick=' +
    asSqlConstant(superheroToUpdate.sidekick) +
    'where id=' +
    id

  console.log('Going to execute: ' + updateSql)
  return asyncDb.run(updateSql)
}

async function deleteSuperhero(id) {
  let deleteSql = 'delete from superhero where id=' + id
  console.log('Going to execute: ' + deleteSql)
  return asyncDb.run(deleteSql)
}
async function createTable() {
  let createSql =
    'create table superhero (name string, alterego string, sidekick string, nickname string);'
  return asyncDb.run(createSql)
}
module.exports = {
  findAll,
  findById,
  create,
  update,
  deleteSuperhero,
  createTable,
}
