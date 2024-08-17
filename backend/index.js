import express from 'express'
import { configDotenv } from 'dotenv'
import connectDB from './config/connectDB.js'
import cookieParser from 'cookie-parser'
import path from 'path'
import userRoutes from './routes/userRoutes.js'

configDotenv()
connectDB()

const app = express()
const port = process.env.PORT || 5001
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/users', userRoutes)

app.listen(port, () => {
  console.log(`Running on server http://localhost:${port}`)
})
