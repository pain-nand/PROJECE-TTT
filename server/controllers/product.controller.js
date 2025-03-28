const cloudinary = require("../config/cloudinary.config")
const ProductModel = require("../models/Product.model")


const getAllProducts = async (req, res, next) => {
    try {
        const products = await ProductModel.find({})
        return res.status(200).json({ products })

    }
    catch (error) {
        next(error)
    }
}


const createProduct = async (req, res, next) => {
    try {
        res.send('working')
    }
    catch (error) {
        next(error)
    }
}

module.exports = {
    getAllProducts,
    createProduct
}