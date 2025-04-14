let mongoose=require("mongoose");

let categorySchema=mongoose.Schema({
   title:{
    type:String,
    required:[true,"title is required"],
   },
   imageUrl:{
    type:String,
    default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpg8ef-llrDJTIowXg8zwXUVwbdJCWaM8wAQ&s",
   }

},{ timestamps: true });

let Category=mongoose.model("Category",categorySchema);

module.exports = Category;