const router = require("express").Router()
const { protectRoute, adminAuthorization } = require("../middlewares/protectRoute")
const { getAllProducts, createProduct, getRecommendedProducts, getFeaturedProductController, toggleFeturedProduct } = require("../controllers/product.controller")

router.get("/", protectRoute, adminAuthorization, getAllProducts)
router.post("/", protectRoute, adminAuthorization, createProduct)
router.get("/recommendations", getRecommendedProducts)
router.get("/featured", protectRoute, getFeaturedProductController)
router.patch("/:id", protectRoute, toggleFeturedProduct)
module.exports = router