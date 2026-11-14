const mongoose=require("mongoose")

const todoShema=new mongoose.Schema({
title:{
    type:String,
    required:[true,"title is required"]

},
description:{
    type:String,
    required:[true,"Description is Required"]
}
})


module.exports=mongoose.model("todo",todoShema)