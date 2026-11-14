const mongoose=require('mongoose')
const todoModel=require("../modules/todoModules")

exports.todoGetContoller=async(req,res,next)=>{

  try{
const todos=await todoModel.find()
res.status(200).json({
    sucess:true,
    count:todos.length,
    todos
})

  }catch(e){
    res.status(500).json({
    success:false,
    message:e.message
  })

}
}

exports.todoPostContoller=async(req,res,next)=>{
    try{

        const {title,description}=req.body;
        const todos=new todoModel({title,description})
        await todos.save()
        res.status(201).json({
            sucess:true,
            todos
        })
        


    }catch(e){
res.status(500).json({
    success:false,
    message:e.message
})
    }
}


exports.getSingleTodo=async(req,res,next)=>{
    try{
const {id}=req.params
const todos=await todoModel.findById(id)
if(!todos){
    return res.status(404).send("Not Found")
}

res.status(201).json({
    success:true,
    todos
})

    }catch(e){
        res.status(500).json({
            success:false,
            messagee:e.message
        })

    }
}


exports.updateTodos=async(req,res,next)=>{
    try{
        const {id}=req.params;
        const {title,description}=req.body
        const todos=await todoModel.findById(id)


        if(title !=undefined){
  todos.title=title
        }

         if(description !=undefined){
  
            todos.description=description
        }
    
    
         
            

       

        await todos.save()



        res.status(201).json({
            success:true,
            message:"Todo Updated Successfully",
            todos

        })

    }catch(e){
        res.status(500).json({
            success:false,
            message:e.message
        })
    }
}


exports.deleteTodos=async(req,res,next)=>{
    try{

        const {id}=req.params
        const todos=await todoModel.findByIdAndDelete(id)
        res.status(200).json({
            success:true,
            message:"Todo Deleted Succesfully"
        })

    }catch(e){
        res.status(500).json({
            success:false,
            message:e.message
        })
    }
}