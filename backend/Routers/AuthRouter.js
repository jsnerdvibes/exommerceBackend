import express from "express"
import { signup,login } from "../Controllers/Authcontroller.js"
import { signupValidation,loginValidation,addProductValidation,updateProductValidation,deleteProductValidation,findProductValidation } from "../Middlewares/Authvalidation.js"
import { products,updateProduct,listProducts,addProduct,deleteProduct,findProduct } from "../Controllers/Authcontroller.js"


export const router = express.Router()

//Add New User
router.post('/signup',signupValidation,signup)

//User Login
router.post('/login',loginValidation,login)

// get all products for home page 
router.get('/products',products)

//Get products of specific user or DashBoard
router.get('/userProducts/:userId',listProducts)

// Add New product 
router.post('/addProduct',addProductValidation,addProduct)

//Update Product information
router.post('/updateProduct',updateProductValidation,updateProduct)

//Delete Product from DashBoard
router.delete('/deleteProduct',deleteProductValidation,deleteProduct)


//Find single product
router.get('/findProduct/:_id',findProductValidation,findProduct)