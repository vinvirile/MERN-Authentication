require('dotenv').config({ path: './config.env' })
const mongoose = require('mongoose')

const connectDB = async () => {
  await mongoose.connect(
    `mongodb+srv://vinv:${process.env.DB_KEY}@nodeexpressprojects.prgqh.mongodb.net/mern-auth?retryWrites=true&w=majority`
  )
  console.log('MongoDB connected')
}

module.exports = connectDB
