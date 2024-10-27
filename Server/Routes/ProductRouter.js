const express = require('express')
const ProductController = require('./../Controller/ProductController')
const authController = require('./../Controller/authController')
const router = express.Router()





router.route('/')
    .get(ProductController.getAllProducts)
    .post(authController.protect,authController.restrict('admin'),ProductController.addProduct)

router.route('/:id')
    .delete(authController.protect,authController.restrict('admin'),ProductController.deleteProduct)
    .get(authController.protect,ProductController.getProduct)
    .patch(authController.protect,authController.restrict('admin'),ProductController.updateProduct)


module.exports = router