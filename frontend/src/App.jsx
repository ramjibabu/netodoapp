import { useEffect, useState } from 'react'

import './App.css'

function App() {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [todos, setTodos] = useState([])
  const [succesMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [editTitle,setEditTitle]=useState("")
   const [editDescription,setEditDescription]=useState("")
   const [overLay,setOverLay]=useState('')
   const [overLayTitle,setOverLayTitle]=useState("")
      const [overLayDescription,setOverLayDescription]=useState("")

  const [edit, setEdit] = useState(-1)
  const add = () => {
    console.log(edit)


    setErrorMessage('')
    if (title.trim() !== '' && description.trim() !== '') {

      fetch("http://localhost:8000/api/v1/PostTodos", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description })
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Something went wrong")
          }

          return res.json()
        })
        .then((res) => {
          setTodos([...todos, res])
          setSuccessMessage('Todo Added Succesfully')
          setTimeout(() => {
            setSuccessMessage('')
          }, 3000);
        })
        .catch((e) => {
          setErrorMessage(e.message)

        })
    } else {
      setErrorMessage("Title and Description is Importanent")

    }
  }
  
  const updateTodos=async(item)=>{
    try{
     const update=await fetch("http://localhost:8000/api/v1/updateTodos/"+item._id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( {title:editTitle, description:editDescription} )
      })


      if(!update.ok){

        console.log("Somthing went wrong")
        return
      }
      const todo=await update.json()
      console.log(todo)
      console.log("item",item._id)

      const saveTodos=todos.map((val)=>{
        if(val._id===item._id){
          val.title=editTitle,
          val.description=editDescription

        }
        return val
      })

      setTodos(saveTodos)
  
      setEditTitle("")
      setEditDescription("")

    setEdit(-1)
 setSuccessMessage("TodoUpdate successfully")
      setTimeout(() => {
         setSuccessMessage("")
      }, 3000);
     

      



    }catch(e){
      console.log(e.message)
    }
  }

  useEffect(() => {
    getUseres()
  }, [])

  const getUseres = async () => {

    try {

      const todos = await fetch("http://localhost:8000/api/v1/getTodos")
      const rot = await todos.json()
      if (!rot) {
        console.log("Somthing Went Wrong")
      }
      setTodos(rot.todos)


    } catch (e) {
      console.log(e.message)

    }

  }

  const clickEdit = (item) => {


    setEdit(item._id)
setEditTitle(item.title)
setEditDescription(item.description)


  }

  const onHandleDelete=async(item)=>{
    try{
      if(window.confirm('Are you sure want to delete?')){
  const dele= await fetch("http://localhost:8000/api/v1/deleteTodos/"+item._id,{
      method:"DELETE"
     })
     if(dele.ok){
     const deletedTodos= todos.filter((val)=>
        val._id!==item._id
      )
setTodos(deletedTodos)
     }

     setSuccessMessage("Todo Deleted SuccesFully")
     setTimeout(()=>{
setSuccessMessage("")
     },3000)



      }
   

    }catch(e){
      console.log(e.message)
    }

  }

  const handleDetails=async(item)=>{

try{
  const singleTodos=await fetch("http://localhost:8000/api/v1/getSingleTodos/"+item._id)

  if(singleTodos.ok){
    const jack=await singleTodos.json()
    const game=jack.todos
    setOverLay(1)
    setOverLayTitle(game.title)
    setOverLayDescription(game.description)
  }
 

}catch(e){
  console.log(e.message)
}

//     
//     setOverLayTitle(item.title)
//  setOverLayDescription(item.description)


  }

  const close=()=>{
setOverLay('')
overLayTitle('')
overLayDescription('')
  }





  return (
    <div className="position-relative">
      <div className='bg-success text-light p-3 text-center'><h1>Todo App</h1></div>

      <div className='my-3 d-flex gap-3 container align-items-end'>
        <div className='w-50'>
          <label>Title<span className='text-danger'>*</span></label>
          <input type='text' placeholder='Title' className='form-control' value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className='w-50'>
          <label>Description<span className='text-danger'>*</span></label>

          <input type='text' className='form-control' placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <button onClick={add} className='btn btn-dark '>Add</button>



      </div>
      <div className='container'>
        {errorMessage && <p className='text-danger'>{errorMessage}</p>}
        {succesMessage && <p className='text-success'>{succesMessage}</p>}
      </div>



      <div className='container'>
        <ul className='list-group'>
          {todos.map((item) => {
            return <li className='list-group-item bg-info d-flex justify-content-between align-items-center my-2'>

             {edit !==-1 && edit==item._id?
             <div className='form-group d-flex gap-3'>

                <input type='text' placeholder='Title' className='form-control' value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                <input type='text' className='form-control' placeholder='Description' value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />




              </div>:
              <div className='d-flex flex-column'> <span className='fw-bold'>{item.title}</span>
                <span>{item.description}</span></div>
} 
              

              {edit!==-1 && edit==item._id?
              <div className='d-flex gap-2'><button className='btn btn-warning' onClick={() => updateTodos(item)}>Update</button>
                <button className='btn-danger btn' onClick={()=>setEdit(-1)}>Cancel</button></div>:

                <div className='d-flex gap-2'><button className='btn btn-success' onClick={()=>{handleDetails(item)}}>Details</button><button className='btn btn-warning' onClick={() => clickEdit(item)}>Edit</button>
                <button className='btn-danger btn' onClick={()=>{onHandleDelete(item)}}>Delete</button></div>
              } 

              

            </li>
          }

          )}




        </ul>



      </div>

      {overLay &&<>
        <div className='bg-success position-fixed text-light top-50 start-50 translate-middle border border-3 border-light text-center' style={{width:"400px",zIndex:'1',padding:'5px'}}>
        <h1>{overLayTitle}</h1>
        <p className='fw-bold'>{overLayDescription}</p>
        <button className='btn btn-danger' onClick={close}>Close</button>
      </div>
      <div className='bg-dark position-absolute top-0 start-0' style={{width:'100%',height:'100%',opacity:'0.8'}}></div></>}
    


    </div>
  )
}

export default App
