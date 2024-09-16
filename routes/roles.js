
const router = require("express").Router()
const RoleController = require("../controllers/roleController");
const { isLogin } = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const roleController = new RoleController();

router.get("/", isLogin, roleController.list)
router.post("/", isLogin, authorization.isAdmin, roleController.create)

module.exports = router;