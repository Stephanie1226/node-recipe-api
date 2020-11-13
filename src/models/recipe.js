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
  c: {
    type: Number,
    default: 0
  },
  cook_time: {
    type: Number,
    default: 0
  },
  total_time: {
    type: Number,
    required: true
  },
  servings: {
    type: Number,
    default: 0
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

  return recipeObject
}


const Recipe = mongoose.model('Recipe', recipeSchema)
module.exports = Recipe