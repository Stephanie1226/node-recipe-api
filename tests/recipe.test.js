const request = require('supertest')
const app = require('../src/app')

const Recipe = require('../src/models/recipe')
const {
  recipeFour,
  recipeSix,
  setupRecipeDatabase
} = require('./fixtures/recipeDB')
const { 
  userOneId, 
  userOne,
  userTwo,
  userThree,   
  setupUserDatabase 
} = require('./fixtures/userDB')

beforeEach(setupUserDatabase)
beforeEach(setupRecipeDatabase)

test('Should create a new recipe', async () => {
  await request(app)
    .post('/recipes')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
    "title": "Guacamole test setup",
    "preparation": "10 mins",
    "cook_time": "0 mins",
    "servings": "2-4 people",
    "ingredients": [
        "2 ripe avocados",
        "1/4 teaspoon of salt, more to taste",
        "1 tablespoon fresh lime juice or lemon juice",
        "2 tablespoons to 1/4 cup of minced red onion or thinly sliced green onion",
        "1-2 serrano chiles, stems and seeds removed, minced",
        "2 tablespoons cilantro (leaves and tender stems), finely chopped",
        "A dash of freshly grated black pepper",
        "1/2 ripe tomato, seeds and pulp removed, chopped"
    ],
    "steps": [
        "Cut the avocado, remove flesh: Cut the avocados in half. Remove the pit. Score the inside of the avocado with a blunt knife and scoop out the flesh with a spoon.",
        "Mash with a fork: Using a fork, roughly mash the avocado.",
        "Add salt, lime juice, and the rest: Sprinkle with salt and lime (or lemon) juice.",
        "Add the chopped onion, cilantro, black pepper, and chiles."
    ],
    owner: userOneId
  }).expect(201)
})

test('Should not create a new recipe', async () => {
  await request(app)
    .post('/recipes')
    .send({
    "title": "Guacamole test should not create setup",
    "preparation": "10 mins",
    "cook_time": "0 mins",
    "ingredients": [
        "2 ripe avocados",
        "1/4 teaspoon of salt, more to taste",
        "1 tablespoon fresh lime juice or lemon juice",
        "2 tablespoons to 1/4 cup of minced red onion or thinly sliced green onion"
    ],
    "steps": [
        "Cut the avocado, remove flesh: Cut the avocados in half. Remove the pit. Score the inside of the avocado with a blunt knife and scoop out the flesh with a spoon.",
        "Mash with a fork: Using a fork, roughly mash the avocado."
    ],
    owner: userOneId
  }).expect(401)
})

test('Should update an existing recipe for a user', async () => {
  await request(app)
    .patch('/recipes/' + `${recipeFour._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send({
      "title": "Tuna Casserole Update"
    }).expect(200)
})

test('Should read all the recipes for a user', async () => {
  const response = await request(app)
    .get('/recipes')
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(200)
  
  expect(response.body.length).toEqual(2)
})

test('Should filter recipes for a user', async () => {
  const response = await request(app)
    .get('/recipes/tart')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

  expect(response.body.length).toEqual(2)
})

test('Should delete a recipe for a user', async () => {
  await request(app)
    .delete('/recipes/delete')
    .set('Authorization', `Bearer ${userThree.tokens[0].token}`)
    .send({
      "_id": recipeSix._id
    })
    .expect(200)
  
  const response = await Recipe.find({ owner: userThree._id})
  expect(response).toEqual([])
})


