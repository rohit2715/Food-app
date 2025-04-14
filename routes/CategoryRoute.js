const express=require("express");
const authmiddleware = require("../middlewares/authmiddleware");
const { createCatController, getAllCatController, updateCatController, deleteCatController } = require("../controllers/categoryController");
//route object
const router=express.Router();

//routes
router.post("/create",authmiddleware,createCatController);

router.get("/getAll",getAllCatController);

router.put("/update/:id",authmiddleware,updateCatController);

router.delete("/delete/:id",authmiddleware,deleteCatController);

module.exports=router;