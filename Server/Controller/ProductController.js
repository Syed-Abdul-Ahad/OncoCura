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
    const productData = { ...req.body, image: imagePaths };
    const product = await Product.create(productData);

    res.status(201).json({
        status: "success",
        data: { product }
    });
});

// Get all products
exports.getAllProducts = asyncErrorHandler(async (req, res) => {

            // QueryString (filter) logic
        const excludeFields = ['sort','page','limit','fields']

        const queryObj = {...request.query}

        excludeFields.forEach((el)=>{
            delete queryObj[el]
        })

        let query =  Product.find(queryObj)
        // logic end



        // SORTING LOGIC
        if(request.query.sort){
            const sortBy = request.query.sort.split(',').join(' ')
            query = query.sort(sortBy)
        }
        //SORTING LOGIC END



        // PAGINATION LOGIC

        const page = request.query.page*1 || 1;
        const limit = request.query.limit*1 || 10;
        //page 1, 1-10; page2, 11-20

        const skip = (page-1)*limit
        query = query.skip(skip).limit(limit)

        if(request.query.page){
            const ProductCount = await Product.countDocuments();
            if(skip>= ProductCount){
                throw new Error("This page is not found")
            }
        }
        // end of pagination




        const products = await query;

        response.status(200).json({
            status:"success",
            length: products.length,
            data:{
                products
            }
        })
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

