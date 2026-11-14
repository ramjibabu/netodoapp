const mongoose=require("mongoose")



const dbConnect=async()=>{
    try{
await mongoose.connect(process.env.DB);
console.log("DB is Connected Successfully")
    }catch(e){
        console.log({name:e.name,message:e.message})
    }
}


module.exports=dbConnect