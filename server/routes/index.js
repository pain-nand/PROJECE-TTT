const authRouter = require("./auth.route")

const router = require("express").Router()

router.use("/auth", authRouter)

module.exports = router