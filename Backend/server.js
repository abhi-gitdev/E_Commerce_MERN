const express = require('express')
const dotenv = require('dotenv').config()

const port = process.env.PORT || 8001

const app = express()

app.listen(port, () => {
  console.log(`Running on https://localhost:${port}`)
})
