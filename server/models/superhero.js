const mongoose = require('./mongooseDb')

const Superhero = mongoose.model('Superhero', 
    {
        "superheroName": String, 
        "alterEgo": String,
        "homeCity": String,
        "costume": String,
        "superpowers": [String], 
        "nemesis": String
    }
)

async function createSuperhero(superheroData) {
    let newSuperhero = new Superhero(superheroData)
    let createdSuperhero = await newSuperhero.save()
    return createdSuperhero.id
}

async function listSuperheros() {
    return Superhero.find({})
}

async function findById(id) {
    return Superhero.findById(id)
}

async function update(id, newSuperheroData) {
    return Superhero.findByIdAndUpdate(id, newSuperheroData, {
        returnDocument: "after"
    })
}

module.exports = {
    createSuperhero,
    listSuperheros,
    findById,
    update
}