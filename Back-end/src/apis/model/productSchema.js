const mongoose=require('mongoose');

const productSchema= new mongoose.Schema({

    title:String,
    description:String,
    price:Number,
    image:String,
    category:String,
    qty:Number,
    stock:Number


})
module.exports= mongoose.model('product',productSchema)