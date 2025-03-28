const router = require("express").Router()
const { protectRoute, adminAuthorization } = require("../middlewares/protectRoute")
const { getAllProducts, createProduct } = require("../controllers/product.controller")

router.get("/", protectRoute, adminAuthorization, getAllProducts)
router.post("/", protectRoute, adminAuthorization, createProduct)

module.exports = router