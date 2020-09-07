const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  preparation: {
    type: String,
    default: "N/A"
  },
  cook_time: {
    type: String,
    default: "N/A"
  },
  servings: {
    type: String,
    default: "N/A"
  },
  ingredients: [{
    type: String,
    required: true
  }],
  steps:[{
    type: String,
    required: true
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, {
  timestamps: true
})

recipeSchema.methods.toJSON = function () {
  const recipe = this
  const recipeObject = recipe.toObject()

  delete recipeObject.createdAt
  delete recipeObject.updatedAt
  delete recipeObject.owner

  return recipeObject
}


const Recipe = mongoose.model('Recipe', recipeSchema)
module.exports = Recipe