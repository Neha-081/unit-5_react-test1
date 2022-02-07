import React from 'react';
import '../App.css'

function TodoList({title,status,id,deleteMe,toggleList}) {
  return <div id='listFlex'>
    <div>
    <li className='TodoName'>{title}</li>
    </div>
      
      <div>
      {status? (<button className="btn btn-success toggleBtn"  >Completed</button>)
      :
     ( <button className="btn btn-primary toggleBtn" onClick={()=>toggleList(id)}>Pending</button>)
      }
     
     <button className="btn btn-danger delete" onClick={()=>{
          deleteMe(id)
      }}>Delete</button>
      </div>
  </div>;
}

export default TodoList;
