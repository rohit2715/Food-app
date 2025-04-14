let mongoose=require("mongoose");

let orderSchema=new mongoose.Schema({
    foods:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Food",
    }],
    payment:{},
    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    status:{
        type:String,
        enum:["preparing","prepare","delivered","on the way"],
        default:"preparing",
    }
},{ timestamps: true });

let Order=mongoose.model("Order",orderSchema);

module.exports = Order;