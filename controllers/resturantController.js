const resturant = require("../models/resturantModel");

let createResturantController=async (req,res)=>{
    try{
        const {title,imageUrl,food,time,pickUp,delivery,isOpen,logoUrl,rating,ratingCount,code,coords}=req.body;
        if(!title || !coords){
            return res.status(500).send({
                success:true,
                message:"fields are missing",
            });
        }

        let newResturant= new resturant({
            title,
            imageUrl,
            food,
            time,
            pickUp,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords
        });
        await newResturant.save();

        res.status(200).send({
            success:true,
            message:"new resturant is created",
            newResturant,
        });
    }
    catch(error){
        return res.status(500),send({
            success:false,
            message:"Error in create resturent api",
            error,
        });
    }

}
//getting all the data of resturants
const getAllResturantController=async (req,res)=>{
    try {
        const resturants=await resturant.find({});
        if(!resturants)
        {
            return res.status(500).send({
                success:false,
                message:"resturant model is empty",
            });
        }

        res.status(200).send({
            success:true,
            message:"Here is all the resturent",
            totalCount:resturants.length,
            resturants,
        });
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:"Resturant getting api is not working",
            error,
        });
        
    }
}

//getting the single resturant data
const getResturantByIdController=async(req,res)=>{
    try{
        const resturantId=req.params.id;
        if(!resturantId){
            return res.status(404).send({
                success:false,
                message:"please provide id of the resturant",
            });
        }
        const singleResturant=await resturant.findById(resturantId);

        if(!singleResturant){
            return res.status(500).send({
                success:false,
                message:"Resturant is not find in the database",
            });
        }
        res.status(200).send({
            success:true,
            message:"here is detail of your resturant",
            singleResturant,
        });
    }
    catch(error){
        return res.status(500).send({
            success:false,
            message:"api for getting single api is not working",
            error,
        });
    }
}

//deleting the data of single resturant
const deleteResturantController=async(req,res)=>{
    try {
        const resturantId=req.params.id;
        if(!resturantId){
            return res.status(404).status({
                success:false,
                message:"please provide the id for deletion"
            });
        }
        const singleResturant=await resturant.findByIdAndDelete(resturantId);
        if(!singleResturant){
            return res.status(404).send({
                success:false,
                message:"resturant is not found in database",
            });
        } 

        res.status(200).send({
            success:true,
            message:"resturant is deleted",
            singleResturant,
        });

    } catch (error) {
        return res.status.send({
            success:false,
            message:"problem in delete route",
            error,
        });
    }
}
module.exports={createResturantController,getAllResturantController,getResturantByIdController,deleteResturantController};