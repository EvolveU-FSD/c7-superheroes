const {
  createSuperheroTable,
  createSuperhero,
  listSuperheros,
} = require('./superheroSQL')
let superheroList = require('./superheroList.json')

const initialize = async () => {
  // await createSuperheroTable()
  for (let superhero of superheroList) {
    let id = await createSuperhero(superhero)
    console.log(id)
  }
  // let superheroes = await listSuperheros()
  // console.log(JSON.stringify(superheroes))
}

initialize()
