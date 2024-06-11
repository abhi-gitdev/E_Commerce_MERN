const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/connectDB')
const port = process.env.PORT || 8000
const cookieParser = require('cookie-parser')

process.on('uncaughtException', (err) => {
  console.log(`Error:${err}`)
  console.log(`Shutting down server due to Uncaught Exception`)
  process.exit(1)
})

connectDB()
const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/api/products', require('./routes/productRoutes'))
app.use('/api/user', require('./routes/userRoutes'))

const server = app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`)
})

//unhandled rejections are rejections which are not resolved like ex-we've not added .catch block after .then
process.on('unhandledRejection', (err) => {
  console.log(`Error:${err}`)
  console.log(`Shutting down the server due to Unhandled Rejection`)
  server.close(() => {
    process.exit(1)
  })
})
