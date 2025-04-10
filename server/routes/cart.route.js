const { getCartProducts } = require('../controllers/cart.cantroller')
const { protectRoute } = require('../middlewares/protectRoute')

const router = require('express').Router()

router.get("/", protectRoute, getCartProducts)