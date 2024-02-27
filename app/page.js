"use client"
import { useEffect, useState } from "react";
import Todo from "./components/Todo";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

export default function Home() {
  const [fromData,setFormData]=useState({
    title:"",
    description:""
  })
  const [todoData,setTodoData]=useState([])
  function onChangeHandler(e){
    const name=e.target.name;
    const value=e.target.value;
    setFormData(form =>({...form,[name]:value}))
    
  }
  // inseert ToDos
const onSubmitHandler= async(e)=>{
      e.preventDefault()
       
       
      try {
        //API code
        const response = await axios.post('/api',fromData)
        
        console.log("res",response.data.title);
        toast.success(response.data.msg)
        console.log('ccc',fromData);
        // setFormData(fromData.description :'')
       setFormData({
        title:"",
        description:""
      })
      
       
       await fetchTodos()
      } catch (error) {
        toast.error("Error")
      }
      
  }
  //Get ToDos
 const fetchTodos= async()=>{
  const response=await axios("/api")
  setTodoData(response.data.allTodos)
  
 }
 //Delete ToDOs
 const deleteTodo=async (id)=>{
  console.log("id",id);

  const response = await axios.delete('/api',{
    params:{
      mongoId:id
    }
    
    
  })
  

 
  toast.success(response.data.msg)
  fetchTodos()
 }
 //Update ToDos
 const TodoUpdateHandler=async(id)=>{
  const response= await axios.put('/api',{},{
    params:{
      mongoId:id
    }
  })
  toast.success(response.data.msg)
  fetchTodos()
 }
 useEffect(() => {
  fetchTodos()
 }, [])
 console.log(todoData);
 
  return (
    <>
   
    <ToastContainer theme="dark"/>
    <form className="flex item-start flex-col gap-1 w-[80%] max-w[600px] mt-24 px-2 mx-auto " onSubmit={onSubmitHandler} > 
      <input type="text" value={fromData.title} name="title" placeholder="Enter Title " className="px-3 py-2 border-2 w-full"  onChange={onChangeHandler}/>
      <textarea name="description" placeholder="Enter discription" value={fromData.description} className="px-3 py-2 border-2 w-full" onChange={onChangeHandler}></textarea>
      <button type="submit"   className="bg-orange-600 py-3 px-11 text-white">Add ToDo</button>
    </form>
  



    <div className="relative overflow-x-auto mt-24 w-[60%] mx-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50  dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                    Title
                </th>
                <th scope="col" className="px-6 py-3">
                    Discription
                </th>
                <th scope="col" className="px-6 py-3">
                    Status
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
               
            </tr>
        </thead>
        <tbody>
           {
            todoData.map((item,index)=>{
              return <Todo key={index}  TodoUpdateHandler={TodoUpdateHandler} index={index} title={item.title }description={item.description} mongoId={item._id} isCompleted={item.isCompleted}  
              deleteTodo={deleteTodo}
              />
            })
           }
        </tbody>
    </table>
</div>


    </>
    );
}
