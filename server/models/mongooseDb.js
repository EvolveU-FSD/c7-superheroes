const mongoose = require('mongoose')
require('dotenv').config()

const dbUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/c7Superheroes'
mongoose.connect(dbUrl)

module.exports = mongoose
