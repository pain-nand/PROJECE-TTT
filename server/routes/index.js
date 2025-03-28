const authRouter = require("./auth.route")
const productRouter = require("./product.route")
const router = require("express").Router()

router.use("/auth", authRouter)
router.use("/product", productRouter)

module.exports = router