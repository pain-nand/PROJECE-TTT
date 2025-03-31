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
        const { name, description, price, image, category } = req.body
        let cloudinaryResponse = null
        if (image) {
            cloudinaryResponse = await cloudinary.uploader.upload(image, {
                folder: "products"
            })
        }
        image = cloudinaryResponse.secure_url === undefined ? "" : cloudinaryResponse.secure_url
        let product = await ProductModel.create({
            name,
            description,
            price,
            image,
            category
        })

        return res.status(201).json(product)
    }
    catch (error) {
        next(error)
    }
}

const getRecommendedProducts = async (req, res, next) => {
    try {
        const products = await ProductModel.aggregate([
            {
                $sample: { size: 4 }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    image: 1,
                    price: 1
                }
            }
        ])

        return res.status(200).json(products)
    }
    catch (error) {
        next(error)
    }

}

module.exports = {
    getAllProducts,
    createProduct,
    getRecommendedProducts
}