let mongoose=require("mongoose");

let userSchema=mongoose.Schema({
    userName:{
        type:String,
        required:[true,"username is required"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    address:{
        type:Array
    },
    phone:{
        type:String,
        required:[true,"phone number is required"]
    },
    userType:{
        type:String,
        required:[true,"userType is required"],
        default:"client",
        enum:["client","admin","vender","driver"]
    },
    profile:{
        type:String,
        default:"https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
    },
    answer:{
        type:String,
        required:[true,"answer is required"],
    },
},{ timestamps: true });

let User=mongoose.model("User",userSchema);

module.exports = User;