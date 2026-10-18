import Product from "../models/productsModel.js";

export const createProduct = async (req, res) => {
    try {
        const { title, description, price, stocks, category, image } = req.body

        console.log(title, description, price, stocks, category, image);
        if (!title || !description || !price || !category || !image) {
            return res.status(401).json({
                success: false,
                message: "All input fields are required"
            })
        }

        const product = await Product.create({
            title,
            description,
            price,
            stocks,
            category,
            image
        })

        if (!product) {
            return res.status(401).json({
                success: false,
                message: "Product not created"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Product created successfully",
            product
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error
        })
    }
}

export const getAllproducts = async (req, res) => {
    try {
        const products = await Product.find();
        if (!products) {
            return res.status(401).json({
                success: false,
                message: "products not found"
            })
        }

        return res.status(200).json({
            success: true,
            products
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            error
        })
    }
}


export const getProductDetail = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(401).json({
                success: false,
                message: "product not found"
            })
        }

        return res.status(200).json({
            success: true,
            product
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            error
        })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        if (!product) {
            return res.status(400).json({
                success: false,
                message: "Product not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error
        })
    }
}


export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)

        if (!product) {
            return res.status(400).json({
                success: false,
                message: "Product not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            product
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error
        })
    }
}