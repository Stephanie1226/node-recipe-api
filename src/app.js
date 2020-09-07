const express = require('express')
require('./db/mongoose')
/// Our router setup
const userRouter = require('./routers/user')
const recipeRouter = require('./routers/recipe')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(recipeRouter)

module.exports = app