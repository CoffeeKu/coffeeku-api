
const router = require("express").Router()
const RoleController = require("../controllers/roleController");
const { isLogin } = require("../middleware/authentication");

const roleController = new RoleController();

router.get("/", isLogin, roleController.list)

module.exports = router;