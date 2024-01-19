const express=require('express');
const userController=require('../Controllers/userController');
const userRouter=express.Router()
const verifyToken=require('../middlewares/userAuth')

//user register and login-------------

userRouter.post('/register',(userController.createUser))
.post('/login',(userController.userLogin))

//user get products-----------------

.get('/products',(userController.userViewProduct))
.get('/products/category/:categoryname',(userController.productListCategory))
//Token Verify--------------------

.use(verifyToken)
.get('/products/:id',(userController.productById))




//user product add to cart----and view cart------------------


.post('/:id/cart',(userController.addToCart))
.get ('/:id/cart',(userController.viewCartProducts))


//user product add to wishlist---- view wishlist------and delete------------

.post('/:id/wishlist',(userController.addToWishList))
.get('/:id/wishlist',(userController.viewWishlist))
.delete('/:id/wishlist',(userController.deleteWishlist))

//user payment section-----------

.post('/:id/payment',(userController.paymentSession))
.get('/payment/success',(userController.successPayment))

//user orderlist ---------------------------------  

.get('/:id/orders',(userController.orderDetails))
module.exports=userRouter; 