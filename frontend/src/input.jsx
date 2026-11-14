export default function Input(){
    return<>
        <div className='my-3 input-group gap-3 container'>
      <input type='text' placeholder='Title' className='form-control'/>
      <input type='text' className='form-control' placeholder='Description'/>
      <button className='btn btn-dark'>Add</button>
    </div>

    </>
}