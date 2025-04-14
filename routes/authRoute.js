let express=require("express");
const { registerController,loginController } = require("../controllers/authController");
let router=express.Router();

// All the Route
router.post("/register",registerController);

router.post("/login",loginController);

module.exports=router;