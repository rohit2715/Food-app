const testUserController=(req,res)=>{
    try{
        res.status(200).send({
            success:true,
            message:"hey it working properly with full functing",
        })
    }
    catch(err){
        console.log(`error in test api`,err);
    }
}


module.exports={testUserController};