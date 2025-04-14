const express=require("express");
const { testUserController } = require("../controllers/testController");

//route object
const router=express.Router();

//routes
router.get("/testRoute",testUserController);

module.exports=router;