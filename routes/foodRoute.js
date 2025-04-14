const express=require("express");
const authmiddleware = require("../middlewares/authmiddleware");
const { createFoodController, getAllFoodController, gettingSingleFoodController,
     gettingFoodByResturantController, updateFoodController,
      deleteFoodController, placeOrderController, 
      orderStatusController} = require("../controllers/foodController");
const adminMiddleware = require("../middlewares/adminMiddleware");
//route object
const router=express.Router();

//routes
router.post("/create",authmiddleware,createFoodController);

router.get("/getAll",getAllFoodController);

router.get("/get/:id",gettingSingleFoodController);

router.get("/getByResturant/:resturantId",gettingFoodByResturantController);

router.put("/update/:foodId",authmiddleware,updateFoodController);

router.delete("/delete/:id",authmiddleware,deleteFoodController);

//placing order 

router.post("/placeOrder",authmiddleware,placeOrderController);

router.post("/orderStatus/:id",authmiddleware,adminMiddleware,orderStatusController)

module.exports=router;