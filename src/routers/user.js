const express = require('express')
/// For uploading image data
const multer = require('multer')
/// For resizing the images
const sharp = require('sharp')

const auth = require('../middleware/auth')
const User = require('../models/user')

// Set up router
const router = new express.Router()

// Create a new user profile
router.post('/users', async (req, res) => {
  const user = new User(req.body)
  try {
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token})
  } catch (e) {
    res.status(400).send(e)
  }
})
///User Login
router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (e) {
    res.status(400).send()
  }
})
/// User Logout
router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.user.save()
    res.send()
  } catch (e) {
    res.status(500).send()
  }
})
/// User Logout All
router.post('/users/logoutAll', auth, async(req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()
    res.send()
  } catch (e) {
    res.status(500).send()
  }
})
/// For uploading user image
const upload = multer({
  limits: {
    fileSize: 3000000
  },
  fileFilter(req, file, call_back) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|HEIC)$/)) {
      return call_back(new Error('Please upload a valid photo. Format should be one of: jpg, jpeg, png or HEIC.'))
    }
    call_back(undefined, true)
  }
})
router.post('/users/me/avatar', auth,  upload.single('avatar'), async (req, res) => {
  const buffer = await sharp(req.file.buffer).resize({ width: 300, height: 300 }).toBuffer()
  req.user.avatar = buffer
  await req.user.save()
  res.send(req.user)
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message })
})
/// Delete the user image
router.delete('/users/me/avatar', auth, async (req, res) => {
  req.user.avatar = undefined
  await req.user.save()
  res.send()
})
/// User update their information
router.patch('/users/updateme', auth, async (req, res) => {
  try {
    const updates = Object.keys(req.body)
    updates.forEach((update) => req.user[update] = req.body[update])
    await req.user.save()
    res.send(req.user)
  } catch (e) {
    res.status(400).send()
  }
})
/// Delete an user
router.delete('/users/deleteme', auth, async (req, res) => {
  try {
    await req.user.remove()
    res.send(req.user)
  } catch (e) {
    res.status(500).send()
  }
})


module.exports = router