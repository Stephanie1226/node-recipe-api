const express = require('express')
var cors = require('cors')
require('./db/mongoose')
/// Our router setup
const userRouter = require('./routers/user')
const recipeRouter = require('./routers/recipe')

const app = express()

app.use(cors())
app.use(express.json())

app.use(userRouter)
app.use(recipeRouter)

module.exports = app