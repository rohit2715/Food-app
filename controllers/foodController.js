const Food = require("../models/foodModel");
const Order = require("../models/orderModel");
const resturant = require("../models/resturantModel");

const createFoodController = async(req , res)=>{
    try {
        const {title,
            description,
            price,
            imageUrl,
            foodTag,
            Category,
            code,
            isAvilable,
            resturant,
            rating,
            ratingCount,}=req.body;
            if(!title || !description || !price || !resturant){
                return res.status(404).send({
                    success:false,
                    message:"All Fields are required",
                });
            }
            const newFood= new Food({
            title,
            description,
            price,
            imageUrl,
            foodTag,
            Category,
            code,
            isAvilable,
            resturant,
            rating,
            ratingCount
            })

            await newFood.save();
            res.status(200).send({
                success:true,
                message:"Food is added in the resturant list",
                newFood
            });

    } catch (error) {
        return res.status(500).send({
            success:true,
            message:"create Route Api is not working",
            error,
        });
    }
}

const getAllFoodController=async(req,res)=>{
    try {
        const foods=await Food.find({});
        if(!foods){
            return res.status(404).send({
                success:false,
                message:"foods are not found in the database",
            });
        }

        res.status(200).send({
            success:true,
            message:"Food Api is Working Successfully",
            foods,
        });

    } catch (error) {
        console.log("error in get api",error);
        return res.status(500).send({
            success:false,
            message:"Error in get api",
            error,
        });
        
    }
}
//getting single food
const gettingSingleFoodController=async(req,res)=>{
    try {
        const {id}=req.params;
        if(!id){
            return res.status(404).send({
                success:false,
                message:"Id is not found here",
            });
        }
       const singleFood= await Food.findById(id);

       if(!singleFood){
        return res.status(404).send({
            success:false,
            message:"food is not available in the database",
        });
       }
       res.status(200).send({
        success:true,
        message:"Successfully in getting the detail of the single food",
        singleFood
       });

    } catch (error) {
        console.log("Error in Single Api",error);
        return res.status(500).send({
            success:false,
            message:"Error in getting single food",
            error,
        });
        
    }
}

//getting single resturant food 
const gettingFoodByResturantController=async(req,res)=>{
    try {
        const {resturantId}=req.params;
        if(!resturantId){
            return res.status(404).send({
                success:false,
                message:"Id is not found here",
            });
        }
       const singleFood= await Food.find({resturant:resturantId});

       if(!singleFood){
        return res.status(404).send({
            success:false,
            message:"food is not available in the database",
        });
       }
       res.status(200).send({
        success:true,
        message:"Successfully in getting the detail of the single food based on resturant",
        singleFood
       });

    } catch (error) {
        console.log("Error in Single Api",error);
        return res.status(500).send({
            success:false,
            message:"Error in getting single food",
            error,
        });
        
    }
}

const updateFoodController= async(req,res)=>{
    try {
        const{foodId}=req.params;
        if(!foodId){
            return res.status(404).send({
                success:false,
                message:"Id id provide in the Route",
            });
        }

        const food=await Food.findById(foodId);

        if(!food){
            return res.status(404).send({
                success:true,
                message:"food is not found in the database",
            });
        }

        const {title,
            description,
            price,
            imageUrl,
            foodTag,
            Category,
            code,
            isAvilable,
            resturant,
            rating,
            ratingCount}=req.body;

            const updateFood= await Food.findByIdAndUpdate(foodId,{title,
                description,
                price,
                imageUrl,
                foodTag,
                Category,
                code,
                isAvilable,
                resturant,
                rating,
                ratingCount},{new:true});

                res.status(200).send({
                    success:true,
                    message:"updation is successfully",
                    updateFood,
                });
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:"Error is coming through the Update Api",
            error,
        });
    }
}

const deleteFoodController=async(req,res)=>{
    try {
        const{id}=req.params;
        if(!id){
            return res.status(404).send({
                success:false,
                message:"Id is not mention in route",
            });
        }

        const deleteFood=await Food.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            message:"deletion is completed successfully",
            deleteFood,
        });
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:"Error in delete api",
            error,
        });
    }
}
//placing order

const placeOrderController=async(req,res)=>{
    try {
        const {cart}=req.body;
        if(!cart){
            return res.status(404).send({
                success:false,
                message:"card is not found",
            });
        }

        let total=0;
        cart.map((i)=>{
            total+=i.price;
        });

        const newOrder=new Order({
            foods:cart,
            payment:total,
            buyer: req.userId ,
        });

        await newOrder.save();

        res.status(200).send({
            success:true,
            message:"order is successfully",
            newOrder,
        });
    } catch (error) {
        return res.status(404).send({
            success:false,
            message:"Error in placing Ordre",
            error,
        });
        
    }
}

const orderStatusController=async(req,res)=>{
    try {
        const {id}=req.params;
        if(!id){
            return res.status(404).send({
                success:false,
                message:"id is not found in the route",
            });
        }
        const {status}=req.body;
        if(!status){
            return res.status(404).send({
                success:false,
                message:"Provide status of order",
            });
        }
        const yourOrder=await Order.findByIdAndUpdate(id,{status},{new:true});
        res.status(200).send({
            success:true,
            message:"order updated successfully",
            yourOrder,
        });
    } catch (error) {
        return res.status(500).send({
            success:true,
            message:"Order status Api making error",
            error,
        });
    }
}
module.exports={createFoodController,getAllFoodController,gettingSingleFoodController,
    gettingFoodByResturantController,updateFoodController,deleteFoodController,placeOrderController,orderStatusController
};