const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  preparation: {
    type: Number,
    default: "N/A"
  },
  cook_time: {
    type: Number,
    default: "N/A"
  },
  servings: {
    type: Number,
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
  },
  public: {
    type: Boolean,
    required: true
  },
  img: {
    type: Buffer
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