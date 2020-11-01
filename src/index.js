const app = require('./app')
const port = process.env.PORT

// Start mongo server
// /Users/your_name/mongodb/bin/mongod --dbpath=/Users/your_name/mongodb-data
// npm run dev 

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})
