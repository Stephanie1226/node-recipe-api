const request = require('supertest')
const app = require('../src/app')

const User = require('../src/models/user')
const { 
  userOne, 
  userTwoId, 
  userTwo, 
  userThree, 
  setupUserDatabase 
} = require('./fixtures/userDB')

beforeEach(setupUserDatabase)

test('Should sign up a new user', async () => {
  const response = await request(app)
  .post('/users')
  .send({
    name: 'Doris',
    email: 'doris@example.com',
    password: 'Doristest'
  }).expect(201)

  const user = await User.findById(response.body.user._id)
  expect(user).not.toBeNull()
  expect(user.password).not.toBe('Doristest')
})

test('Should login a user', async () => {
  const response = await request(app).post('/users/login').send({
    email: userOne.email,
    password: userOne.password
  }).expect(200)

  const user = await User.findById(response.body.user._id)
  expect(user).not.toBeNull()
})

test('Should not login an user if login info is wrong', async () => {
  const response = await request(app).post('/users/login').send({
    email: userTwo.email,
    password: "thisisarandompwd"
  }).expect(400)
})

test('Should update a user', async () => {
  const response = await request(app)
        .patch('/users/updateme')
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send({
          name: 'Benjamin Update'
        })
        .expect(200)

  const user = await User.findById(userTwoId)
  expect(user.name).toEqual('Benjamin Update')
})

test('Should delete an account for the user', async () => {
  const response = await request(app)
        .delete('/users/deleteme')
        .set('Authorization', `Bearer ${userThree.tokens[0].token}`)
        .send()
        .expect(200)
  
  const user = await User.findById(response.body._id)
  expect(user).toBeNull()
})

test('Should not delete the account without authorization', async () => {
  await request(app)
        .delete('/users/deleteme')
        .send()
        .expect(401)
})


