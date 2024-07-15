const fs = require('fs');
const path = require('path');
const router = require("express").Router()
const errorHandler = require("../helpers/errorHandler")

router.get("/ping", (req, res) => {
  res.send("ping!")
})

// Iterate through the files in the 'routes' folder
fs.readdirSync(__dirname).forEach((file) => {
  if (file.endsWith('.js') && file !== 'index.js') {
    const route = require(`./${file}`);
    const prefix = path.basename(file, '.js'); // Extract the filename without the '.js' extension
    router.use(`/${prefix}`, route); // Mount the route with a dynamic prefix
  }
});

router.use(errorHandler)

module.exports = router