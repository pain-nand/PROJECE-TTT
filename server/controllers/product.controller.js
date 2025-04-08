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

const getFeaturedProductController = async (req, res, next) => {
    try {
        const featuredProducts = await ProductModel.find({
            isFeatured: true
        }).lean()
        if (!featuredProducts) {
            return res.status(404).json({ message: "NO featured Products found" })
        }
        return res.status(200).json(featuredProducts)
    }
    catch (error) {
        next(error)
    }
}

const toggleFeturedProduct = async (req, res, next) => {
    try {
        const product = await ProductModel.findById(req.params.id)
        if (product) {
            product.isFeatured = !product.isFeatured
            const updateProduct = await product.save()
            return res.status(200).json(updateProduct)
        }
        else {
            return res.status(404).json({ message: "Product not found" })
        }
    }
    catch (error) {
        next(error)
    }

}

const deleteProductController = async (req, res, next) => {
    try {
        const product = await ProductModel.findById(req.params.id)
        if(!product) return res.status(404).json({message: 'product not found'})
        if(product.image) {
            const publicId = product.image.split("/").pop().split(".")[0]

        }
        await cloudinary.uploader.destroy(`products/${publicId}`)
        console.log('product image deleted successfull')

       await ProductModel.findByIdAndDelete(req.params.id)
       return res.status(200).json({message:"product deleted successfull"})
    }
    catch(error) {
        next(error)
    }

}

const getProductByCategory = async(req, res, next) => {
    const {category} = req.body
    try {
        const products = await ProductModel.find({category})
        return res.json({products})
    }
    catch(error) {
        next(error)
    }
}


module.exports = {
    getAllProducts,
    createProduct,
    getRecommendedProducts,
    getFeaturedProductController,
    toggleFeturedProduct,
    deleteProductController,
    getProductByCategory
}