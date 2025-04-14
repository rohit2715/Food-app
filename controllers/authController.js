let User=require("../models/userModel");
const bcrypt=require("bcryptjs");
const JWT=require("jsonwebtoken");
const registerController=async(req,res)=>{
    try{
        let{userName,email,password,address,phone,answer}=req.body;

        if(!userName || !email || !password || !address || !phone || !answer){
            return res.status(500).send({
                success:false,
                message:"complete all the fields",
            });
        }

        const existing=await User.findOne({email})
        if(existing){
            return res.status(500).send({
                success:false,
                message:"email already exists.",
            });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        const newUser=await User.create({
            userName,
            email,
            password:hashPassword,
            address,
            phone,
            answer,
        });

        res.status(200).send({
            success:true,
            message:"User is register successfully!",
            newUser
        });
        
    }
    catch(err){
        console.log(err)
        res.status(500).send({
            success:false,
            message:"something went wrong",
            err
        });
    }
}

//login controller

const loginController=async (req,res)=>{
    try{
        const {email,password}=req.body;
        //validation
        if(!email || !password){
            return res.status(500).send({
                success:false,
                message:"please provide all the data!",
            });
        }

        const user=await User.findOne({email:email});

        if(!user){
            return res.status(404).send({
                success:false,
                message:"User not find! email mismatch",
            });
        }

        //check userPassword || compare password

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            res.status(500).send({
                success:false,
                message:"invalid password! try one more time",
            });
        }
        //using jwt
        const token=JWT.sign({id:user._id},process.env.JWT_SECRET,{
            expiresIn:"7d",
        });

        user.password=undefined;

        res.status(200).send({
            success:true,
            message:"User login Successfully",
            token,
            user
        });
    }
    catch(err){
        console.log(err);
        res.status(500).send({
            success:false,
            message:"failed ! error in login api",
            err
        });
    }

}

module.exports={registerController,loginController};