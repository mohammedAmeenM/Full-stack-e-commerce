const express=require('express');
const adminRouter=express.Router()
const adminController=require('../Controllers/adminController')
const verifyToken=require('../middlewares/adminAuth');
const uploadImage = require('../middlewares/uploads/multerImageUpload');

 

adminRouter.post('/login',(adminController.adminLogin))

//verify token -----------


//get userss lists--------

.get('/users',(adminController.allUsers))
.get('/users/:id',(adminController.userById))

//admin product CRUD operations ------

.post ('/products',uploadImage,(adminController.createProduct))
.get('/products',(adminController.adminListProducts))
.get('/products/:id',(adminController.adminProductById))
.put('/products',(adminController.updateProduct))
.delete('/products',(adminController.deleteProduct))
.use(verifyToken)

//admin payment status and orderlist-------

.get('/status',adminController.status)
.get('/orders',(adminController.orderDtails))

module.exports=adminRouter;