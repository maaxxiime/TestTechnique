const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.js");

const controllers = require("../controllers/users.js");

router.get("/", controllers.read_all);
router.post("/signup", controllers.signup);
router.post("/login", controllers.login);
router.delete("/:TargetId", auth, controllers.delete);
router.put("/:TargetId", auth, controllers.update);

module.exports = router;
