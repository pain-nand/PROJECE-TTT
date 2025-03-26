const { signupController, signinController, logoutController, refreshTokenController, profileController } = require("../controllers/auth.controller");

const router = require("express").Router()

router.post("/signup", signupController)
router.post("/signin", signinController)
router.post("/logout", logoutController)
router.post("/refresh-token", refreshTokenController)
router.get("/profile", profileController)


module.exports = router
