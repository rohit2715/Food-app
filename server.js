const { bgGreen } = require("colors");
let express=require("express");
let cors=require("cors");
let morgan=require("morgan");
let dotenv=require("dotenv");
let app=express();
dotenv.config();
const testRoute = require("./routes/testRoute");
const authRoute=require("./routes/authRoute");
const userRoute=require("./routes/userRoute");
const resturantRoute = require("./routes/resturantRoute");
const categoryRoute=require("./routes/CategoryRoute");
const foodRoute=require("./routes/foodRoute");
const connectDB = require("./config/db");
//connection in mongodb
connectDB();
//middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//routes
app.use("/api/v1/test",testRoute);
app.use("/api/v1/auth",authRoute)
app.use("/api/v1/user",userRoute)
app.use("/api/v1/resturant",resturantRoute);
app.use("/api/v1/category",categoryRoute);
app.use("/api/v1/food",foodRoute);
//mainRoute
app.get("/",(req,res)=>{
    res.send("All the Route were working properly");
});

let port=process.env.port || 8080;
app.listen(port,(req,res)=>{
    console.log(`app is listening at port ${port}`.white.bgMagenta);
})