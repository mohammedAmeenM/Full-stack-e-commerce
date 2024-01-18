const jwt=require('jsonwebtoken');
const Users=require('../model/userSchema')
const mongoose = require("mongoose");
const productSchema = require('../model/productSchema');
const asyncErrorHandler=require('../utils/asyncErrorHandler');
const User = require('../model/userSchema');
const Order=require('../model/orderSchema');
const Category = require('../model/categorySchema')


 
const adminLogin=async (req,res)=>{
    const {email,password}=req.body;
    console.log(process.env.ADMIN_PASSWORD);
    if(email===process.env.ADMIN_EMAIL&&password===process.env.ADMIN_PASSWORD){
        const token=jwt.sign({email:email},process.env.ADMIN_SECRET_STR);
        res.status(200).json({
            status:"success",
            data:token
        })
    }else{
        res.status(404).json({
            status:"error",
            message:'this is no an admin'
        })
    }
}
const allUsers=async(req,res)=>{
    const findAllUsers=await Users.find();
    // console.log(findAllUsers);
    if(!findAllUsers){
        return res.status(404).json({
            status:'Error',
            message:'Users not found'
        })
    }
    res.status(200).json({
        status:'Success',
        message:'successfully fetched users datas',
        data:findAllUsers
    })
}

const userById=  async (req,res)=>{
   
    const userId=req.params.id;
    
    if(!mongoose.Types.ObjectId.isValid(userId)){ 
        return res.status(400).json({
            status:'Error', 
            message:'Invalid user ID format'
        })
    } 

    const user= await Users.findById(userId)

    if(!user){
        return res.status(404).json({
            status:'Error',
            message:'user not found'
        })
    }
    // console.log("daaaa", user) 
    return res.status(200).json({
        status:'success',
        message:'successfully fetched user data', 
        data:user
    })  

}

const createProduct= async(req,res)=>{
     const {title,description,price,image,category,stock}=req.body;
     console.log(req.body);
     const newProduct= await productSchema.create({
        title,description,price,image,category,qty:1,stock  
     })
     res.status(201).json({
        status: 'success',
        message: 'Successfully created a product.',
        data:newProduct
        })
}
  
const adminListProducts=asyncErrorHandler(async(req,res)=>{
    const products= await productSchema.find();
    if(!products){
       return res.status(404).json({
            status:'fail',
            message:'products not found'
        })
    }
    res.status(200).json({
        status:'success',
        message:'successfully fetched datas',
        products:products
        })
})

const adminProductById=asyncErrorHandler(async(req,res)=>{
    const productId=req.params.id;
    if(!mongoose.Types.ObjectId.isValid(productId)){
      return res.status(400).json({
            status:'fail',
            message:'invalid ID format'
        })
    }
    const product =await productSchema.findById(productId);
    if(!product){
       return res.status(404).json({
            status:'fail',
            message:'product not found'
        })
    }
    res.status(200).json({
        status:'success',
        message:'successfully fetched data',
        product:product
    })
})

const updateProduct = asyncErrorHandler(async (req, res) => {
    const { id, title, description, price, image, category ,stock} = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid product ID format',
      });
    }
  
    const product = await productSchema.findById(id);
  
    if (!product) {
      return res.status(404).json({
        status: 'fail',
        message: 'Product not found in the database',
      });
    }
  
    const update = await productSchema.findByIdAndUpdate(
      { _id: id },
      { title, description, price, image, category,stock },
      { new: true }
    );
  
    res.status(201).json({
      status: 'success',
      message: 'Successfully updated',
      product: update,
    });
  });
  
    const deleteProduct=asyncErrorHandler(async(req,res)=>{
        const {productId}=req.body; 
        console.log(productId);
        if(!mongoose.Types.ObjectId.isValid(productId)){
            return res.status(400).json({
                status:'fail',
                message:'invalid product ID format'
            })
        }
        const deletePro= await productSchema.findByIdAndDelete({_id:productId})
            if(!deletePro){
                return res.status(404).json({
                    status:'fail',
                    message:'product not found'
                })
            }
            res.status(200).json({
                status:'success',
                message:'successfully delete product'

            })
    })

  const status=asyncErrorHandler(async(req,res)=>{
       const totalRevenue=await Order.aggregate([
        {
          $group: {
            _id: null,
            totalProduct: { $sum: { $size: "$products" } },
            totalRevenue: { $sum: "$total_amount" },
          },
        },
      ]);
      if (totalRevenue.length > 0) {
        // You have results
        res.status(200).json({ status: "Success", data: totalRevenue[0] });
      } else {
        // No results found
        res
          .status(200)
          .json({
            status: "Success",
            data: { totalProduct: 0, totalRevenue: 0 },
          });
      }
  })

  const orderDtails=asyncErrorHandler(async(req,res)=>{
    const products = await Order.find();
        if (products.length === 0) {
        return res.status(200).json({
            message: "No products ",
     });
    }
     res.status(200).json({
        status: "Success",
        message: "Successfully fetched order details",
        products,
    });
  })

  const createCategory=asyncErrorHandler(async(req,res)=>{
    try {
        const {name} = req.body
    console.log(name);
    if(!name){
      return res.status(401).json({
        status:'error',
        message:'name not requeird'
      })
    }
    const existingCategory=await Category.findOne({name})
    if(existingCategory){
        return res.status(409).json({
          status:'error',
          message:'Category already exisits'
        })
      }
      const category = await new categoryModel({name, slug:slugify(name)}).save()
      res.status(201).json({
        status:'success',
        message:'successfully category created',
        data:category
        
      })
    } catch (error) {
        res.status(500).json({
            status:'error',
            message:'Error in category'
          })
    }
  })
  
const getAllCategory = asyncErrorHandler(async(req,res)=>{
    try {
      const category = await Category.find({})
      res.status(200).json({
        status:'success',
        message:'successfully feached all category',
        data:category
        
      })
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status:'error',
        message:'internal server error'
      })
    }
    })

    //update category

    const updateCategory =asyncErrorHandler(async (req,res)=>{
    try {
      const {name} = req.body
      const {id} = req.params
      const category = await Category.findByIdAndUpdate(id,
        {name, slug:slugify(name)},
      {new:true});
    res.status(200).json({
      status:'success',
      message:'Category updated successfully',
      category
    })
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status:'error',
        message:'internal server error'
      })
    }
    })
    
    
    //delete category
    const deleteCategory =async (req,res)=>{
    try {
      const {id} = req.params
      await Category.findByIdAndDelete(id)
      res.status(200).json({
        status:'success',
        message:'Category removed successfully'
    
      })
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status:'error',
        message:'internal server error'
      })
    }
    }
    
    
    



module.exports={
    adminLogin,allUsers,userById,createProduct,adminListProducts,adminProductById,updateProduct,deleteProduct,
    status,orderDtails,createCategory,getAllCategory,updateCategory,deleteCategory
} 