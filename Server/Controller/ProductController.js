const Product = require('./../Model/ProductModel')
const asyncErrorHandler = require('./../utils/asyncErrorHandler')



// Add product with image upload
exports.addProduct = asyncErrorHandler(async (req, res) => {
        const imagePaths = req.files.map(file => file.path);
        console.log(imagePaths)
        const productData = { ...req.body, images: imagePaths };
        const product = await Product.create(productData);
    
        res.status(201).json({
            status: "success",
            data: { product }
        });
    });


// with images

exports.getAllProducts = asyncErrorHandler(async (req, res) => {
    // QueryString (filter) logic
    const excludeFields = ['sort', 'page', 'limit', 'fields'];
    const queryObj = { ...req.query };

    excludeFields.forEach((el) => {
        delete queryObj[el];
    });

    let query = Product.find(queryObj);

    // SORTING LOGIC
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    }

    // PAGINATION LOGIC
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 10;
    // const skip = (page - 1) * limit;
    // query = query.skip(skip).limit(limit);

    // if (req.query.page) {
    //     const ProductCount = await Product.countDocuments();
    //     if (skip >= ProductCount) {
    //         throw new Error("This page is not found");
    //     }
    // }

    const products = await query;

    // Construct the base URL for the images
    const baseUrl = `${req.protocol}://${req.get('host')}/`;

    // Append the base URL to the image paths
    const productsWithImages = products.map(product => {
        return {
            ...product._doc,
            images: product.images.map(img => baseUrl + img) // Prepend the base URL to each image path
        };
    });

    res.status(200).json({
        status: "success",
        length: productsWithImages.length,
        data: {
            products: productsWithImages
        }
    });
});


// Get single product by ID
exports.getProduct = asyncErrorHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
        status: "success",
        data: { product }
    });
});


// Update product with new images
exports.updateProduct = asyncErrorHandler(async (req, res) => {
    const imagePaths = req.files ? req.files.map(file => file.path) : undefined;
    const updatedData = imagePaths ? { ...req.body, image: imagePaths } : req.body;
    const product = await Product.findByIdAndUpdate(req.params.id, updatedData, { new: true, runValidators: true });

    res.status(200).json({
        status: "success",
        data: { product }
    });
});


// Delete product
exports.deleteProduct = asyncErrorHandler(async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).json({
        status: "success",
        data: null
    });
});

