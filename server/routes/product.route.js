const router = require("express").Router()
const { protectRoute, adminAuthorization } = require("../middlewares/protectRoute")
const { getAllProducts, createProduct, getRecommendedProducts } = require("../controllers/product.controller")

router.get("/", protectRoute, adminAuthorization, getAllProducts)
router.post("/", protectRoute, adminAuthorization, createProduct)
router.get("/recommendations", getRecommendedProducts)
module.exports = router