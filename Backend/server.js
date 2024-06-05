const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/connectDB')
const port = process.env.PORT || 8000

connectDB()
const app = express()

app.use('/api/products', require('./routes/productRoutes'))

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`)
})
