
const router = require("express").Router()
const UserController = require("../controllers/userController");

const userController = new UserController();

router.get("/", userController.list)

module.exports = router;