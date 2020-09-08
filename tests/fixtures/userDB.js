const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const User = require('../../src/models/user')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
  _id: userOneId,
  name: 'Stephanie',
  email: 'stephanie@example.com',
  password: 'Stephanietest',
  tokens: [{
    token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
  }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
  _id: userTwoId,
  name: 'Benjamin',
  email: 'benjamin@example.com',
  password: 'Benjamintest',
  tokens: [{
    token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
  }]
}

const userThreeId = new mongoose.Types.ObjectId()
const userThree = {
  _id: userThreeId,
  name: 'Cecilia',
  email: 'cecilia@example.com',
  password: 'Ceciliatest',
  tokens: [{
    token: jwt.sign({ _id: userThreeId }, process.env.JWT_SECRET)
  }]
}

const setupUserDatabase = async () => {
  await User.deleteMany()
  await new User(userOne).save()
  await new User(userTwo).save()
  await new User(userThree).save()
}

module.exports = {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  userThree,
  setupUserDatabase
}