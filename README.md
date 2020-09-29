# node-recipe-api
* This is the back-end of the side project "Recipe App".
* Using nodejs/expressjs and mongoDB in this project. This is hosting on heroku with the following link: https://chieh-recipe-manager.herokuapp.com
* Two documents in mongoDB: User, Recipe
* User document saves the user information, including "name", "email" and "password".
* Recipe document saves recipe information, including "title", "preparation", "cook_time", "servings", "ingredients" and "steps".
* User must Sign up for a new account or sign in before creating/updating/deleting a recipe.

## Query string varaibles
### User
1. Create a new user
```
[POST request]: {{url}}/users
```
body(JSON):
1. name field is required
3. email field is required
4. password field is required, cannot not set this field as "password". Minimun length is set to 7.
```
{
    "name": "YourName",
    "age": 20,
    "email": "yourname@gexample.com",
    "password": "yoursecretpsword"
}
```
***
2. Login your account
```
[POST request]: {{url}}/users/login
```
body(JSON):
```
{
    "email": "yoursignupemail@gexample.com",
    "password": "yoursignuppsword"
}
```
***
3. Logout your account (no JSON body needed)
```
[POST request]: {{url}}/users/logout
```
***
4. Logout your account from all of the devices (no JSON body needed)
```
[POST request]: {{url}}/users/logoutAll
```
***
5. Update your profile data (Can only be updated after you login)
```
[PATCH request]: {{url}}/users/updateme
```
body(JSON):
```
{
    "name": "YourName",
    "email": "yourname@gexample.com",
    "password": "yoursecretpsword"
}
```
***
7. Delete your account (Can only be deleted after you login, no JSON body needed)
```
[DELETE request]: {{url}}/users/deleteme
```
***
### Recipe
1. Create a new recipe
```
[POST request]: {{url}}/recipes
```
body(JSON):
1. title field is required.
2. preparations field is not reqired. Default value is "N/A"
3. cook_time field is not reqired. Default value is "N/A"
4. servings field is not reqired. Default value is "N/A"
5. ingredients is required.
6. steps field is required.
7. public field is required.
```
{
    "title": "Perfect Guacamole Recipe",
    "preparation": "10 mins",
    "cook_time": "5 mins",
    "servings": "4 - 6 people",
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
      "Mash with a fork: Using a fork, roughly mash the avocado. (Don't overdo it! The guacamole should be a little chunky.)",
      "Add salt, lime juice, and the rest: Sprinkle with salt and lime (or lemon) juice.",
      "Add the chopped onion, cilantro, black pepper, and chiles."
    ],
    "public": true
}
```
***
2. Upload a photo for the recipe
```
[POST request]: {{url}}/recipes/:id/foodimg
```
body(form-data):
Key: foodimg, Value: [Select your image from your computer]
***
3. Update your recipe
```
[PATCH request]: {{url}}/recipes/:id
```
body(JSON):
1. You can update any field that you would like to by simply provide the JSON body
```
{
    "title": "",
    "preparation": "",
    "cook_time": "",
    "servings": "",
    "ingredients": [
        "ingredient 1",
        "ingredient 2"
    ],
    "steps": [
      "step 1",
      "step 2"
    ]
}
```
***
4. Read all of your recipes (no JSON body needed)
```
[GET request]: {{url}}/recipes
```
***
5. Read all of the public recipes (no JSON body needed)
```
[GET request]: {{url}}/recipes/public
```
***
6. Filter out some specific recipes (no JSON body needed)
```
[GET request]: {{url}}/recipes/<insert_keyword_here>
```
***
7. Delete an existing recipe
```
[DELETE request]: {{url}}/recipes/delete
```
body(JSON):
1. Use the id to delete a specific recipe.
```
{
  "_id": "insert_your_recipe_id_here"
}
```
## Tests
1. npm install test packages:
```
npm i jest --save-dev
npm i supertest --save-dev
```
***
2. add test commant line in package.json
```
"scripts": {
  "test": "env-cmd -f ./config/test.env jest --testEnvironment=node --watch --runInBand"
}
```
***
3. Run test cases
```
npm test
```
