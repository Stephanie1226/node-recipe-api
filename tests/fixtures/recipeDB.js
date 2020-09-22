const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const Recipe = require('../../src/models/recipe')
const { userOne, userTwo, userThree } = require('./userDB')

const recipeOneId = new mongoose.Types.ObjectId()
const recipeOne = {
  _id: recipeOneId,
  "title": "Guacamole",
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
  "public": true,
  owner: userOne._id
}

const recipeTwoId = new mongoose.Types.ObjectId()
const recipeTwo = {
  _id: recipeTwoId,
  "title": "Lemon tart",
  "preparation": "20 mins",
  "cook_time": "30 mins",
  "servings": "6  people",
  "ingredients": [
      "1 tablespoon lemon zest",
      "3/4 cup fresh lemon juice",
      "1/2 cup sugar",
      "1/4 teaspoon fine sea salt (omit if using salted butter)",
      "3 large eggs + 4 large egg yolks",
      "4 tablespoons unsalted butter (1/2 stick), cubed"
  ],
  "steps": [
      "Whisk eggs and egg yolks very well in a bowl. Set aside.",
      "In a small saucepan, heat lemon zest, juice, sugar and salt over medium heat until sugar is dissolved. Turn off heat. Slowly scoop a about 1/2 cup into the eggs while whisking.",
      "Pour egg mixture into the pan on the stove while whisking to prevent curdling. Turn heat back on to low and cook, whisking, until mixture has thickened, about 5 minutes.",
      "Remove from heat and stir in the cubed butter until it’s completely mixed in.",
      "At this point you can strain the zest out and any egg solids that may be in the curd if you’d like, by pushing it through a fine mesh stainer, or just leave it as is.",
      "Cover lemon curd and chill until ready to use."
  ],
  "public": true,
  owner: userOne._id
}

const recipeThreeId = new mongoose.Types.ObjectId()
const recipeThree = {
  _id: recipeThreeId,
  "title": "Chocolate tart",
  "preparation": "20 mins",
  "cook_time": "40 mins",
  "servings": "8 people",
  "ingredients": [
      "170 g/6 oz (1 cup) coarsely chopped bittersweet chocolate",
      "170 g/6 oz (1 cup) coarsely chopped milk chocolate",
      "1 cup (240 ml) heavy cream",
      "1/4 cup (1/2 stick/56 g) butter, cut into small pieces"
  ],
  "steps": [
      "In a medium heatproof bowl, place chopped bittersweet and milk chocolate. Set aside.",
      "In a small saucepan over medium heat, bring the heavy cream and butter to a low boil. ",
      "Remove from the heat and pour mixture over the chocolate. Let stand for 1 minute.",
      "Using a rubber spatula, stir mixture until melted and smooth (if not completely melted, heat in the microwave for several seconds and stir, until melted).",
      "Pour mixture over chilled Oreo crust and refrigerate until set, at least 4 hours or overnight. (You can make the tart a day ahead of time.)"
  ],
  "public": false,
  owner: userOne._id
}

const recipeFourId = new mongoose.Types.ObjectId()
const recipeFour = {
  _id: recipeFourId,
  "title": "Tuna Casserole",
  "preparation": "15 mins",
  "cook_time": "20 mins",
  "servings": "6 people",
  "ingredients": [
      "1 (12 ounce) package egg noodles",
      "¼ cup chopped onion",
      "2 cups shredded Cheddar cheese",
      "1 cup frozen green peas",
      "2 (5 ounce) cans tuna, drained",
      "2 (10.75 ounce) cans condensed cream of mushroom soup",
      "½ (4.5 ounce) can sliced mushrooms",
      "1 cup crushed potato chips"
  ],
  "steps": [
      "Bring a large pot of lightly salted water to a boil. Cook pasta in boiling water for 8 to 10 minutes, or until al dente; drain.",
      "Preheat oven to 425 degrees F (220 degrees C).",
      "In a large bowl, thoroughly mix noodles, onion, 1 cup cheese, peas, tuna, soup and mushrooms. Transfer to a 9x13 inch baking dish, and top with potato chip crumbs and remaining 1 cup cheese.",
      "Bake for 15 to 20 minutes in the preheated oven, or until cheese is bubbly."
  ],
  "public": true,
  owner: userTwo._id
}

const recipeFiveId = new mongoose.Types.ObjectId()
const recipeFive = {
  _id: recipeFiveId,
  "title": "Garlic Pesto Tuna Salad Sandwiches",
  "preparation": "10 mins",
  "cook_time": "0 mins",
  "servings": "2-4 people",
  "ingredients": [
      "2 (5 ounce) cans tuna in water, drained",
      "2 tablespoons mayonnaise",
      "1 tablespoon prepared mustard",
      "2 tablespoons basil pesto",
      "2 cloves garlic, minced",
      "8 slices rye bread",
      "8 leaves lettuce",
      "1 large ripe tomato, sliced"
  ],
  "steps": [
      "In a medium bowl, mix together tuna, mayonnaise, mustard, pesto, and garlic.",
      "Make four sandwiches by layering tuna, lettuce, and tomato slices between slices of bread. Serve."
  ],
  "public": false,
  owner: userTwo._id
}

const recipeSixId = new mongoose.Types.ObjectId()
const recipeSix = {
  _id: recipeSixId,
  "title": "Baked Spaghetti",
  "preparation": "25 mins",
  "cook_time": "1 hour",
  "servings": "8 people",
  "ingredients": [
      "1 (16 ounce) package spaghetti",
      "1 pound ground beef",
      "1 onion, chopped",
      "1 (32 ounce) jar meatless spaghetti sauce",
      "1/2 teaspoon seasoned salt",
      "2 eggs",
      "1/4 cup and 1 teaspoon grated Parmesan cheese",
      "1/4 cup and 1 tablespoon butter, melted",
      "2 cups and 2 tablespoons small curd cottage cheese, divided",
      "4 cups shredded mozzarella cheese, divided"
  ],
  "steps": [
      "Preheat oven to 350 degrees F (175 degrees C). Lightly grease a 9x13-inch baking dish.",
      "Bring a large pot of lightly salted water to a boil. Cook spaghetti in boiling water, stirring occasionally until cooked through but firm to the bite, about 12 minutes. Drain.",
      "Heat a large skillet over medium heat; cook and stir beef and onion until meat is browned and onions are soft and translucent, about 7 minutes. Drain. Stir in spaghetti sauce and seasoned salt.",
      "Whisk eggs, Parmesan cheese, and butter in a large bowl. Mix in spaghetti to egg mixture and toss to coat. Place half the spaghetti mixture into baking dish. Top with half the cottage cheese, mozzarella, and meat sauce. Repeat layers. Cover with aluminum foil.",
      "Bake in preheated oven for 40 minutes. Remove foil and continue to bake until the cheese is melted and lightly browned, 20 to 25 minutes longer."
  ],
  "public": false,
  owner: userThree._id
}

const setupRecipeDatabase = async () => { 
  await Recipe.deleteMany()
  await new Recipe(recipeOne).save()
  await new Recipe(recipeTwo).save()
  await new Recipe(recipeThree).save()
  await new Recipe(recipeFour).save()
  await new Recipe(recipeFive).save()
  await new Recipe(recipeSix).save()
}


module.exports = {
  recipeOne,
  recipeTwo,
  recipeThree,
  recipeFour,
  recipeFive,
  recipeSix,
  setupRecipeDatabase
}



