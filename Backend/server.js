const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/connectDB')
const port = process.env.PORT || 8000
const cookieParser = require('cookie-parser')

connectDB()
const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/api/products', require('./routes/productRoutes'))
app.use('/api/user', require('./routes/userRoutes'))

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`)
})
