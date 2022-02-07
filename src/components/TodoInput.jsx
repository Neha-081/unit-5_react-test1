import React from 'react';
import '../App.css'

function TodoInput({handleClick,addItem,text,handleAddTodo}) {


  return <div>
  <div className="form-group">
    <h1 className='title'>TODO...</h1>
    <input  className="form-control inputBody inputTitle"  id="exampleInputEmail1" placeholder='Add Task...' value={text} onChange={addItem}/>
  </div>
      <button className="btn btn-success addBtn" disabled={!text} onClick={handleAddTodo}>Add</button>

  </div>;
}

export default TodoInput;

// onClick={()=>handleClick(text)}
