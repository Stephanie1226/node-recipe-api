const express = require('express')
/// For uploading image data
const multer = require('multer')
/// For resizing the images
const sharp = require('sharp')

const auth = require('../middleware/auth')
const Recipe = require('../models/recipe')

// Set up router
const router = new express.Router()

/// Create a new recipe
router.post('/recipes', auth, async (req, res) => {
  const recipe = new Recipe({
    ...req.body,
    owner: req.user._id,
    owner_name: req.user.name
  })
  try {
    await recipe.save()
    res.status(201).send(recipe)
  } catch (e) {
    res.status(400).send(e)
  }
})
/// Upload an image for the recipe
const upload = multer({
  limits: {
    fileSize: 3000000
  },
  fileFilter(req, file, call_back) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|HEIC)$/)) {
      return call_back(new Error('Please upload a valid photo. Format should be one of: jpg, jpeg, png or HEIC.'))
    }
    call_back(undefined, true)
  }
})
router.post('/recipes/:id/foodimg', upload.single('foodimg'), async (req, res) => {
  const recipe = await Recipe.findById(req.params.id)
  //console.log(recipe)
  const buffer = await sharp(req.file.buffer).resize({ width: 600, height: 400 }).toBuffer()
  recipe.img = buffer
  await recipe.save()
  res.send(recipe)
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message })
})

/// Get all of the recipes for a user
router.get('/recipes/me/all', auth, async (req, res) => {
  try {
    const recipes = await Recipe.find({ owner: req.user._id })
    res.send(recipes)
  } catch (e) {
    res.status(500).send(e)
  }
})
/// Get all of the public recipes for a user
router.get('/recipes/me/public', auth, async (req, res) => {
  try {
    const recipes = await Recipe.find({ owner: req.user._id, public: true })
    res.send(recipes)
  } catch (e) {
    res.status(500).send(e)
  }
})
/// Get all of the private recipes for a user
router.get('/recipes/me/private', auth, async (req, res) => {
  try {
    const recipes = await Recipe.find({ owner: req.user._id, public: false })
    res.send(recipes)
  } catch (e) {
    res.status(500).send(e)
  }
})
/// Get all of the recipes that is public
router.get('/recipes/public', async (req, res) => {
  try {
    const recipes = await Recipe.find({ public: true })
    res.send(recipes)
  } catch (e) {
    res.status(500).send(e)
  }
})
/// Get all of the recipes that is dessert (public)
router.get('/recipes/public/dessert', async (req, res) => {
  try {
    const recipes = await Recipe.find({ public: true, dessert: true })
    res.send(recipes)
  } catch (e) {
    res.status(500).send(e)
  }
})
/// Get all of the recipes that is meal (public)
router.get('/recipes/public/meal', async (req, res) => {
  try {
    const recipes = await Recipe.find({ public: true, meal: true })
    res.send(recipes)
  } catch (e) {
    res.status(500).send(e)
  }
})
/// Get all of the recipes that is drink (public)
router.get('/recipes/public/drink', async (req, res) => {
  try {
    const recipes = await Recipe.find({ public: true, drink: true })
    res.send(recipes)
  } catch (e) {
    res.status(500).send(e)
  }
})
/// Get a specific (public) recipe that matches the id
router.get('/recipes/:id', async (req, res) => {
  try {
    const _id = req.params.id
    const recipe = await Recipe.findOne({ _id, public: true })
    if(!recipe) {
      return res.status(404).send()
    }
    res.send(recipe)
  } catch (e) {
    res.status(500).send(e)
  }
})
/// Get recipes that matches the keyword
router.get('/recipes/:keyword', auth, async (req, res) => {
  try {
    const keyword = await req.params.keyword.toLowerCase()
    const recipes = await Recipe.find({ owner: req.user._id })
    const filtered = await recipes.filter((recipe) => recipe.title.toLowerCase().includes(keyword))

    res.send(filtered)
  } catch (e) {
    res.status(500).send(e)
  }
})
/// Update an existing recipe
router.patch('/recipes/:id', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findOne({ _id: req.params.id })
    updates = Object.keys(req.body)
    updates.forEach((update) => recipe[update] = req.body[update])
    await recipe.save()
    res.send(recipe)
  } catch (e) {
    res.status(400).send(e)
  }
})
/// Delete an existing recipe
router.delete('/recipes/delete', auth, async (req, res) => {
  try {
    await Recipe.deleteOne({ _id: req.body._id})
    res.send()
  } catch (e) {
    res.status(500).send(e)
  }
})


module.exports = router