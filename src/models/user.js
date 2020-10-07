const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Recipe = require('./recipe')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate (value) {
      if(!validator.isEmail(value)) {
        throw new Error ('Email is invalid, please enter a valid email!')
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate (value) {
      if(value.toLowerCase().includes('password')) {
        throw new Error ('Password cannot contain "password" inside.')
      }
    }
  },
  avatar: {
    type: Buffer
  },
  tokens: [{
    token: {
      type: String,
      require: true
    }
  }]
}, {
  timestamps: true
})

/// Reference to Recipe momdel
userSchema.virtual('recipes', {
  ref: 'Recipe',
  localField: '_id',
  foreignField: 'owner'
})
/// Delete non-neccesary data
userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens
  delete userObject.createdAt
  delete userObject.updatedAt

  return userObject
}
/// Generate token for every sign-in
userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

  user.tokens = user.tokens.concat({ token })
  await user.save()

  return token
}
/// Check if he/she is an existing user in our database
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({email: email})
  if (!user) {
    throw new Error ({"error": "cannot find an existing user with this email. Please try it again."})
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new Error ({"error": "Wrong password. Please try it again"})
  }
  return user
}
/// Hash the plan text password before saving
userSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})
// Delete user's recipes after user is removed
userSchema.pre('remove', async function (next) {
  const user = this
  await Recipe.deleteMany({ owner: user._id })
  next()
})


const User = mongoose.model('User', userSchema)
module.exports = User