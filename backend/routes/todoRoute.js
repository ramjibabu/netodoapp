const express=require("express")
const router=express.Router()
const {todoGetContoller,todoPostContoller,getSingleTodo,updateTodos,deleteTodos}=require("../contollers/todoController")

router.route("/getTodos").get(todoGetContoller)
router.route("/PostTodos").post(todoPostContoller)
router.route("/getSingleTodos/:id").get(getSingleTodo)
router.route("/updateTodos/:id").put(updateTodos)
router.route("/deleteTodos/:id").delete(deleteTodos)

module.exports=router

