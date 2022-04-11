const db = require('./sqlDb')

async function createSuperheroTable() {
  let createQuery = `
    CREATE TABLE superhero (
      "id"	INTEGER,
      superheroName text unique, 
      alterEgo text, 
      homeCity text, 
      costume text,
      nemesis text,
      superpowers text,
      PRIMARY KEY("id" AUTOINCREMENT)
    )
    `
  db.run(createQuery).then(() => console.log('table was created'))
}
function nullableField(value) {
  if (value) {
    return `"${value}"`
  } else {
    return 'NULL'
  }
}
async function createSuperhero(superheroData) {
  let superpowers = JSON.stringify(superheroData.superpowers)
  console.log(superpowers)
  const createQuery = `
    INSERT INTO superhero (superheroName, alterEgo, homeCity, costume, nemesis, superpowers)
    VALUES ("${superheroData.superheroName}",
    ${nullableField(superheroData.alterEgo)}, ${nullableField(
    superheroData.homeCity
  )}, ${nullableField(superheroData.costume)}, ${nullableField(
    superheroData.nemesis
  )},?)
  `
  await db.run(createQuery, superpowers)
  const getIdQuery = `SELECT id FROM superhero WHERE superheroName="${superheroData.superheroName}"`
  let createdSuperhero = await db.get(getIdQuery)
  console.log(createdSuperhero)
  return createdSuperhero.id
}

async function listSuperheros() {
  let superheroes = await db.all('SELECT *, id as _id from superhero')
  return superheroes.map((superhero) => ({
    ...superhero,
    superpowers: JSON.parse(superhero.superpowers),
  }))
}

async function findById(id) {
  let superhero = await db.get(
    `SELECT *, id as _id from superhero WHERE id=${id}`
  )
  superhero.superpowers = JSON.parse(superhero.superpowers)
  return superhero
}

async function update(id, newSuperheroData) {
  const updateQuery = `
  UPDATE superhero SET superheroName="${newSuperheroData.superheroName}",
  alterEgo=${nullableField(
    newSuperheroData.alterEgo
  )}, homeCity=${nullableField(
    newSuperheroData.homeCity
  )}, costume=${nullableField(
    newSuperheroData.costume
  )}, nemesis=${nullableField(
    newSuperheroData.nemesis
  )},superpowers="${JSON.stringify(newSuperhero.superpowers)}"
  WHERE id=${id}
  
  `
  return db.run(updateQuery)
}

async function deleteSuperhero(id) {
  const deleteQuery = `DELETE FROM superhero WHERE id=${id}`
  return db.run(deleteQuery)
}

// never call this in production!
async function deleteAll() {
  return db.run(`DELETE FROM superhero`)
}

module.exports = {
  createSuperheroTable,
  createSuperhero,
  listSuperheros,
  findById,
  update,
  deleteSuperhero,
  deleteAll,
}
