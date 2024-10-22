const Product = require('./../Model/ProductModel')
// const ApiFeatures = require('./../utils/ApiFeatures')

const asyncErrorHandler = require('./../utils/asyncErrorHandler')









exports.getAllProducts= asyncErrorHandler( async (request,response)=>{



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

})





exports.addProduct = asyncErrorHandler( async (request,response)=>{
    // const testMovie = new Movie({})
    // testMovie.save()

        const product = await Product.create(request.body)

        response.status(201).json({
            status:"success",
            data:{
                product
            }
        })
    
})


exports.updateProduct= asyncErrorHandler(async  (request,response)=>{

        const product = await Product.findByIdAndUpdate(request.params.id, request.body, {new:true, runValidators:true})
        response.status(200).json({
            status:"success",
            length: product.length,
            data:{
                product
            }
        })

})




exports.deleteProduct= asyncErrorHandler (async (request,response)=>{

        await Product.findByIdAndDelete(request.params.id)

        response.status(204).json({
            status:"Success",
            data: null
        })
})




exports.getProduct= asyncErrorHandler( async(request,response)=>{

    // const movies = await Movie.find({_id:req.params.id})
        const product = await Product.findById(request.params.id)
        response.status(200).json({
            status:"success",
            length: product.length,
            data:{
                product
            }
        })

})

