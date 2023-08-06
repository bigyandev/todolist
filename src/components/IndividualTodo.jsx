import React from "react"
import { Button } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Stack} from "react-bootstrap"

const IndividualTodo = ({todoArray,handleDelete,handleEdit}) => {
   
   
   
    
 return (
   
    <Stack style={{height: "100px", width: "400px"}}className="p-2 bg-info m-1 square rounded-2" direction="horizontal" gap={3}>
    <h3 className="p-2">{todoArray.title.toUpperCase()}</h3>
    <Button variant="danger" className="m-1" onClick={handleDelete}>DELETE</Button>
    <div className="vr" />
    <Button variant="success" onClick={handleEdit}>EDIT</Button>
    
    </Stack>
   
 )
}
export default IndividualTodo