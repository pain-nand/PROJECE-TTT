const { signupController, signinController, logoutController, refreshTokenController, profileController } = require("../controllers/auth.controller");
const { protectRoute } = require("../middlewares/protectRoute");

const router = require("express").Router()

router.post("/signup", signupController)
router.post("/signin", signinController)
router.get("/logout", logoutController)
router.post("/refresh-token", refreshTokenController)
router.get("/profile", protectRoute, profileController)


module.exports = router
