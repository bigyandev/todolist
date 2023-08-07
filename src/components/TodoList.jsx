import React, {useReducer, useState,useEffect} from "react"
import IndividualTodo from "./IndividualTodo"
import "./TodoList.css"
import { Button,Container } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';

const newTodo =(todo) =>  {
   return {id: new Date().getSeconds() , title:todo}
}
const reducer = (todoArray,action) => {
    const {type, payload} = action
    
    
    switch(type) {
      case "todoSubmit" :
        const updatedArray =  payload.todoArray
        return updatedArray
        
      case "deleteTodo": 
        const deletedArray =  payload.todoArray
        return deletedArray

     default: 
     return todoArray
    }
}
//helper function 
const getfFromLocalStorage = () => {
    const data = localStorage.getItem("todo");
    if(data) {
        return JSON.parse(localStorage.getItem("todo"))
    }
    else {
        return []
    }
}
const TodoList = () => {
    
    
    const [todoArray, dispatch] = useReducer(reducer, getfFromLocalStorage())
    const [title,setTitle] = useState("")
    const [editTodoId, setEditTodoId] = useState(0)
   
    
   useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todoArray))
   },[todoArray])
 
    const handleSubmit = (e) => {
     
        if(editTodoId) {
            const updatedTodo = todoArray.map((todo) => todo.id === editTodoId ?
            {...todo, title:title} :todo
            
        )
        dispatch({type:"todoSubmit", payload: {todoArray :updatedTodo}})
        setTitle("")
        setEditTodoId(0)
        
    }
        else {

        if(title.length > 0) {
        const newTodoItem = newTodo(title)
        dispatch({type: "todoSubmit", payload: {todoArray: [...todoArray, newTodoItem]}})
        setTitle("")
        
        }
    }
}
    

    const handleDelete = (todo) => {
        const updatedTodo = todoArray.filter((t) => t.id !== todo.id)
        dispatch({type: "deleteTodo", payload: {todoArray:updatedTodo}})
    }
    const handleEdit = (todo) => {
       
        setEditTodoId(todo.id)
        setTitle(todo.title)

    }


    return (
        <>
         <Container style ={{height: "200px", minWidth: "100%",backgroundColor: "#ddd"}} className="d-flex flex-wrap justify-content-center align-content-center">
        <input type="text" 
        placeholder="enter the todo" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}/>
        <Button className="m-1" onClick={(e) => handleSubmit(e)}>
            {editTodoId ? "EDIT" : "SUBMIT"}
        </Button>
        </Container>
        <Container style ={{height: "500px", width:"600px"}} className="d-flex flex-wrap justify-content-center align-content-center">
        {todoArray && todoArray.map((t) => {
          return <IndividualTodo 
            key={t.id}
            todoArray = {t}
            handleDelete = {() => handleDelete(t)}
            handleEdit = {() => handleEdit(t)}
            />
        })}
       </Container>
        </>
    )
}

export default TodoList