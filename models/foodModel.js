let mongoose=require("mongoose");

let foodSchema=mongoose.Schema({
   title:{
    type:String,
    required:[true,"title is required"],
   },
   description:{
    type:String,
    required:[true,"description is required"],
   },
   price:{
    type:Number,
    required:[true,"Price is required"]
   },
   imageUrl:{
    type:String,
    default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpg8ef-llrDJTIowXg8zwXUVwbdJCWaM8wAQ&s"
   },
   foodTag:{
    type:String,
   },
   Category:{
    type:String,
   },
   code:{
    type:String,
   },
   isAvilable:{
    type:Boolean,
    default:true,
   },
   resturant:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"resturant"
   },
   rating:
   {
    type:Number,
    default:4,
    min:1,
    max:5,
   },
   ratingCount:{
    type:String
   }

},{ timestamps: true });

let Food=mongoose.model("Food",foodSchema);

module.exports = Food;