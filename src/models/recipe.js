const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  dessert: {
    type: Boolean,
    default: false
  },
  meal: {
    type: Boolean,
    default: false
  },
  drink: {
    type: Boolean,
    default: false
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
  public: {
    type: Boolean,
    required: true
  },
  img: {
    type: Buffer
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  owner_name: {
    type: String,
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

  return recipeObject
}


const Recipe = mongoose.model('Recipe', recipeSchema)
module.exports = Recipe