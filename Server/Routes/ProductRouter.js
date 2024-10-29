const express = require('express')
const ProductController = require('./../Controller/ProductController')
const authController = require('./../Controller/authController')
const upload = require('./../utils/multerConfig'); // Multer configuration for image uploads

const router = express.Router()





// router.route('/')
//     .get(authController.protect,ProductController.getAllProducts)
//     .post(authController.protect,authController.restrict('admin'),ProductController.addProduct)

// router.route('/:id')
//     .delete(authController.protect,authController.restrict('admin'),ProductController.deleteProduct)
//     .get(authController.protect,ProductController.getProduct)
//     .patch(authController.protect,authController.restrict('admin'),ProductController.updateProduct)





// router.route('/')
//     .get(authController.protect, ProductController.getAllProducts)
//     .post(
//         authController.protect,
//         authController.restrict('admin'),
//         upload.array('image', 5),
//         ProductController.addProduct
//     );

// router.route('/:id')
//     .get(authController.protect, ProductController.getProduct)
//     .patch(
//         authController.protect,
//         authController.restrict('admin'),
//         upload.array('image', 5),
//         ProductController.updateProduct
//     )
//     .delete(authController.protect, authController.restrict('admin'), ProductController.deleteProduct);


router.route('/')
    .get( ProductController.getAllProducts)
    .post(
        upload.array('images', 4),
        ProductController.addProduct
    );

router.route('/:id')
    .get(ProductController.getProduct)
    .patch(
        upload.array('images', 4),
        ProductController.updateProduct
    )
    .delete(ProductController.deleteProduct);



module.exports = router;



module.exports = router