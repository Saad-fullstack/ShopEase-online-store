import express from "express"
import { createProduct, deleteProduct, getAllproducts, getProductDetail, updateProduct } from "../controllers/productsController.js"
import { isAdmin ,isAuthenticatedUser } from "../utils/userAuth.js"

const productRouter = express.Router()

productRouter.post("/create-product", isAuthenticatedUser, isAdmin("admin"), createProduct)
productRouter.get("/get-all-products", getAllproducts)
productRouter.get("/product-detail/:id", getProductDetail)
productRouter.patch("/update-product/:id", isAuthenticatedUser, isAdmin("admin"), updateProduct)
productRouter.delete("/delete-product/:id", isAuthenticatedUser, isAdmin("admin"), deleteProduct)


export default productRouter