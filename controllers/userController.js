const bcrypt = require("bcryptjs");
const User=require("../models/userModel");
//getting user detail
const getUserController=async (req,res)=>{
    try{
        const user=await User.findById(req.userId);

        if(!user){
            return res.status(404).send({
                success:false,
                message:"user not found",
            });
        }
        //hidden password
        user.password=undefined;
        //getting user
        res.status(200).send({
            success:true,
            message:"user find SuccessFully",
            user
        });
    }
    catch(err){
        console.log(err);
        res.status(500).send({
            success:false,
            message:"error in api",
            err
        });
    }
}

//updating user
const updateUserController=async (req,res)=>{
    try {
        const user = await User.findById(req.userId);

        if(!user){
            return res.status(404).send({
                success:false,
                message:"User not find",
            })
        }

        const {userName,phone,address}=req.body;

        if(userName){
            user.userName=userName;
        }
        else if(phone){
            user.phone=phone;
        }
        else if(address){
            user.address=address;
        }

        await user.save();

        res.status(200).send({
            success:true,
            message:"user is updated",
            user
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in update api",
            error
        });
    }
}
//update password
const updatePasswordController = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).send({
                success: false,
                message: "Old and new passwords are required",
            });
        }

        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: "Old password is incorrect",
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).send({
            success: true,
            message: "Password updated successfully",
            user
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while updating password",
            error
        });
    }
};

// reset password

const resetPasswordController=async (req,res)=>{
    try {
        const {email,newPassword,answer}=req.body;
        if(!email || !newPassword || !answer){
            return res.status(500).send({
                success:false,
                message:"Please provide all the field",
            });
        }

        const user=await User.findOne({email,answer});
        if(!user){
            return res.status(500).send({
                success:false,
                message:"user not found in database",
            });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(newPassword, salt);
        user.password=hashPassword;
        await user.save();

        res.status(200).send({
            success:true,
            message:"password reset successfully"
        });

    } catch (error) {
        return res.status(500).send({
            success:false,
            message:"Error in reset api",
            error,           
        });
    }
}

//deleting user
const deleteProfileController=async(req,res)=>{
    try {
        const deletedUser=await User.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success:true,
            message:"User is deleted successfully",
            deletedUser
        });
        
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:"Error in delete api",
            error
        });
        
    }
}
module.exports={getUserController,updateUserController, updatePasswordController,resetPasswordController,deleteProfileController};