const Product = require('./../Model/ProductModel')
const asyncErrorHandler = require('./../utils/asyncErrorHandler')

// exports.getAllProducts= asyncErrorHandler( async (request,response)=>{



//         // QueryString (filter) logic
//         const excludeFields = ['sort','page','limit','fields']

//         const queryObj = {...request.query}

//         excludeFields.forEach((el)=>{
//             delete queryObj[el]
//         })

//         let query =  Product.find(queryObj)
//         // logic end



//         // SORTING LOGIC
//         if(request.query.sort){
//             const sortBy = request.query.sort.split(',').join(' ')
//             query = query.sort(sortBy)
//         }
//         //SORTING LOGIC END



//         // PAGINATION LOGIC

//         const page = request.query.page*1 || 1;
//         const limit = request.query.limit*1 || 10;
//         //page 1, 1-10; page2, 11-20

//         const skip = (page-1)*limit
//         query = query.skip(skip).limit(limit)

//         if(request.query.page){
//             const ProductCount = await Product.countDocuments();
//             if(skip>= ProductCount){
//                 throw new Error("This page is not found")
//             }
//         }
//         // end of pagination




//         const products = await query;

//         response.status(200).json({
//             status:"success",
//             length: products.length,
//             data:{
//                 products
//             }
//         })

// })





// exports.addProduct = asyncErrorHandler( async (request,response)=>{

//         const product = await Product.create(request.body)

//         response.status(201).json({
//             status:"success",
//             data:{
//                 product
//             }
//         })
    
// })


// exports.updateProduct= asyncErrorHandler(async  (request,response)=>{

//         const product = await Product.findByIdAndUpdate(request.params.id, request.body, {new:true, runValidators:true})
//         response.status(200).json({
//             status:"success",
//             length: product.length,
//             data:{
//                 product
//             }
//         })

// })




// exports.deleteProduct= asyncErrorHandler (async (request,response)=>{

//         await Product.findByIdAndDelete(request.params.id)

//         response.status(204).json({
//             status:"Success",
//             data: null
//         })
// })




// exports.getProduct= asyncErrorHandler( async(request,response)=>{
    
//         const product = await Product.findById(request.params.id)
//         response.status(200).json({
//             status:"success",
//             length: product.length,
//             data:{
//                 product
//             }
//         })

// })




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



// Get all products
// exports.getAllProducts = asyncErrorHandler(async (req, res) => {

//             // QueryString (filter) logic
//         const excludeFields = ['sort','page','limit','fields']

//         const queryObj = {...req.query}

//         excludeFields.forEach((el)=>{
//             delete queryObj[el]
//         })

//         let query =  Product.find(queryObj)
//         // logic end



//         // SORTING LOGIC
//         if(req.query.sort){
//             const sortBy = req.query.sort.split(',').join(' ')
//             query = query.sort(sortBy)
//         }
//         //SORTING LOGIC END



//         // PAGINATION LOGIC

//         // const page = req.query.page*1 || 1;
//         // const limit = req.query.limit*1 || 10;
//         // //page 1, 1-10; page2, 11-20

//         // const skip = (page-1)*limit
//         // query = query.skip(skip).limit(limit)

//         // if(req.query.page){
//         //     const ProductCount = await Product.countDocuments();
//         //     if(skip>= ProductCount){
//         //         throw new Error("This page is not found")
//         //     }
//         // }
//         // end of pagination




//         const products = await query;

//         res.status(200).json({
//             status:"success",
//             length: products.length,
//             data:{
//                 products
//             }
//         })
// });

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

