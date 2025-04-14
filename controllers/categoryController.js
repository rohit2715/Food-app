const Category = require("../models/categoryModel");
const mongoose = require("mongoose");
let createCatController = async (req,res)=>{
    try {
        const {title,imageUrl}=req.body;
        //validation
        if(!title){
            return res.status(404).send({
                success:false,
                message:"Please provide valid title and imageUrl",
            });
        }

       const newCategory = new Category({title,imageUrl});
        await newCategory.save();
        res.status(200).send({
            success:true,
            message:"new category is save in database",
            newCategory,
        });
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:"category api is not working",
            error,
        });
        
    }
}

const getAllCatController=async(req,res)=>{
    try {
        const categories=await Category.find({});
        if(!categories){
            return res.status(404).send({
                success:false,
                message:"categories documents are not found"
            });
        }

        res.status(200).send({
            success:true,
            message:"getting all categories",
            totalCat:categories.length,
            categories,
        });
        
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:"get All Api is not working",
            error
        });
    }
}

const updateCatController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, imageUrl } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({
                success: false,
                message: "Invalid category ID",
            });
        }

        const updateCategory = await Category.findByIdAndUpdate(
            id,
            { title, imageUrl },
            { new: true }
        );

        if (!updateCategory) {
            return res.status(404).send({
                success: false,
                message: "No category is found",
            });
        }

        res.status(200).send({
            success: true,
            message: "Category is updated",
            updateCategory,
        });
    } catch (error) {
        console.error("Update API Error:", error);
        return res.status(500).send({
            success: false,
            message: "Error in Update API",
            error,
        });
    }
};

const deleteCatController=async(req,res)=>{
    try {
        const {id}=req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({
                success: false,
                message: "Invalid category ID",
            });
        }

        const deleteCategory=await Category.findByIdAndDelete(id);
        if(!deleteCategory){
            return res.status(404).send({
                success:false,
                message:"No Such Category is Found",
            });
        }
        
        res.status(200).send({
            success:true,
            message:"deletion is completed successfully",
            deleteCategory,
        });
        
    } catch (error) {
        console.log("Error in delete Api",error);
        return res.status.send({
            success:false,
            message:"Error in delete Api",
            error
        })
    }
}

module.exports={createCatController,getAllCatController,updateCatController,deleteCatController};