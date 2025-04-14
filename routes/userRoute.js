let express=require("express");
const {getUserController, updateUserController,updatePasswordController,resetPasswordController, deleteProfileController} = require("../controllers/userController");
const authmiddleware = require("../middlewares/authmiddleware");
let router=express.Router();

// All the Route
router.get("/getUser",authmiddleware,getUserController);
router.put("/updateUser",authmiddleware,updateUserController);
router.put("/updatePassword", authmiddleware, updatePasswordController);
router.post("/resetPassword",authmiddleware,resetPasswordController);
router.delete("/delete/:id",authmiddleware,deleteProfileController);
module.exports=router;