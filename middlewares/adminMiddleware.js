const User=require("../models/userModel");
module.exports=async(req,res,next)=>{
    try{
        const user=await User.findById(req.userId);
        if(user.userType !== "admin"){
            return res.status(401).send({
                success:false,
                message:"only Admin Access"
            });
        }
        else{
            next();
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send({
            success:false,
            message:"Unauthorised access",
            err
        });
    }
}