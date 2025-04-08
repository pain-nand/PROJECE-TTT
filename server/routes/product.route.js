const router = require("express").Router()
const { protectRoute, adminAuthorization } = require("../middlewares/protectRoute")
const { getAllProducts, createProduct, getRecommendedProducts, getFeaturedProductController, toggleFeturedProduct, deleteProductController, getProductByCategory } = require("../controllers/product.controller")

router.get("/", protectRoute, adminAuthorization, getAllProducts)
router.post("/", protectRoute, adminAuthorization, createProduct)
router.get("/recommendations", getRecommendedProducts)
router.get("/featured", protectRoute, getFeaturedProductController)
router.patch("/:id", protectRoute, toggleFeturedProduct)
router.delete('/:id', protectRoute, adminAuthorization, deleteProductController)
router.get('/category/:category', getProductByCategory)
module.exports = router