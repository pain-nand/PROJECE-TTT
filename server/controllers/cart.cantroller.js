const ProductModel = require('../models/Product.model')

const getCartProducts = async (req, res, next) => {
    try {
        const Produts = await ProductModel.find({
            _id: { $in: req.user.cartItems }
        })

        const cartItems = Produts.map((product) => {
            const item = req.user.cartItems.find((cartItems) => cartItems._id === product._id)
            return { ...product.toJSON(), quantity: item.quantity }
        })
        return res.json(cartItems)
    }
    catch (error) {
        next(error)
    }
}

const addToCart = async (req, res, next) => {
    try {
        const { productId } = req.body
        const user = req.user
        const existingItem = user.cartItems.find(item => item._id === productId)
        if (existingItem) {
            user.cartItems.quantity += 1
        }
        else {
            user.cartItems.push(productId)
        }
        await user.save()
        return res.json(user.cartItems)
    }
    catch (error) {
        next(error)
    }
}


const removeAllFromCart = async (req, res, next) => {
    try {
        const { productId } = req.body
        const user = req.user
        if (!productId) {
            user.cartItems = []
        }
        else {
            user.cartItems = user.cartItems.filter((item) => item._id !== productId)
        }
        await user.save()
        return res.json(user.cartItems)
    }
    catch (error) {
        next(error)
    }
}

const updatingQuantity = async(req, res, next) => {
    try {

    }
    catch
}
module.exports = {
    getCartProducts,
    addToCart,
    removeAllFromCart
}