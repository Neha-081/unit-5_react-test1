import React, {  useState,useEffect } from "react";
import TodoInput from "./TodoInput";
import { v4 as uuid } from "uuid";
import TodoList from "./TodoList";
import { JSON_API } from "../helpers/api";
import '../App.css'


function Todo() {
  let [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [loading,setLoading]=useState(false)
  const [page,setPage]=useState(1)

//add todo
  const handleAddTodo=()=>{
      fetch(`${JSON_API}/todos`,{
          method:"POST",
          body:JSON.stringify({
              title:text,
              id: uuid(),
              status:false
          }),
          headers:{
              "content-Type":"application/json"
          },
      }).then(getTodos)
      .then(()=>{
          setText("")
      })
      .catch((err)=>console.log("err",err))
  }

  const getTodos=()=>{
    fetch(`${JSON_API}/todos?_page=${page}&_limit=3`)
    .then((d)=>d.json())
    .then(setTodos).then(()=>{
        setLoading(false)
    })
}

//delete todo

const deleteMe = (id) => {
    fetch(`${JSON_API}/todos/${id}`, {
      method: "DELETE",
    }).then(res => {
      getTodos()}).catch((err)=> console.log(err,'delete ni hua'))
  };


  //update
  const toggleList = (id) => {
    fetch(`${JSON_API}/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        status:true
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(getTodos)
    .catch(err => console.log(err,'patch ni hua'));
  };


useEffect(()=>{
    getTodos(page)
},[page])

//   const handleClick = (textComing) => {

//     if (todos.length) {
//         for (let el of todos) {
//           if (el.title === textComing) {
//             alert(`Item with name "${textComing}" already exist`);
//           }
//            else {
//             setTodos();
//           }
//         }
//       } else {
//             setTodos();
//       }
//     setText("")
//   };



  const addItem = (e) => {
    setText(e.target.value);
  };


  return loading? (<h1>...Loading</h1>):
  (
    <div className="container">
      <TodoInput addItem={addItem} text={text}  handleAddTodo={handleAddTodo}/>
      {todos.map((e) => {
        return (
          <TodoList
          status={e.status}
          toggleList={toggleList}
          deleteMe={deleteMe}
            key={e.id}
            title={e.title}
            id={e.id}
          />
        );
      })}
      <div className="pageDiv">
 <button className="btn btn-secondary prev" disabled={page===1} onClick={()=>{
   setPage(page-1)
   setLoading(true)
 }}>Prev</button>
 <button disabled={page>todos.length} className="btn btn-secondary"  onClick={()=>{
   setPage(page+1)
   setLoading(true)
 }}>Next</button>
 <h5 >Page:{page}</h5>
 </div>
    </div>
  );
}

export default Todo;
