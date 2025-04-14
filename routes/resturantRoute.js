let express=require("express");
const authmiddleware = require("../middlewares/authmiddleware");
const { createResturantController, getAllResturantController, getResturantByIdController, deleteResturantController } = require("../controllers/resturantController");
let router=express.Router();

// All the Route
router.post("/create",authmiddleware,createResturantController);
router.get("/getAll",getAllResturantController);
router.get("/get/:id",getResturantByIdController)
router.delete("/delete/:id",authmiddleware,deleteResturantController)
module.exports=router;