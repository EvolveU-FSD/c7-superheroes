let superheroList = require('./superheroList.json')
let superheroModel = require('./superhero')

superheroList.forEach(async (hero) => {
  console.log('Creating superhero:', hero.superheroName)
  try {
    let createdId = await superheroModel.createSuperhero(hero)
    console.log('... created with id', createdId)
  } catch (err) {
    console.log('Error creating superhero:', hero.superheroName)
    console.log(err.message)
  }
})
