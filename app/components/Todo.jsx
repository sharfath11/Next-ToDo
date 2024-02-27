//ToDO component
import React from "react";

function Todo({mongoId,title,description,TodoUpdateHandler,index,isCompleted,deleteTodo}) {
  return (
    <tr className="bg-white border-b  dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
      >
       {index+1}
      </th>
      <td className={`px-6 py-4 ${isCompleted  ?'line-through':""}`}>{title}</td>
      <td className={`px-6 py-4 ${isCompleted  ?'line-through':""}`}>{description}</td>
      <td className="px-6 py-4">{!isCompleted? "Pending":"Completed"}</td>
      <td className="px-6 py-4 flex gap-1 "> <button className="py-2   px-4 bg-red-500 text-white " onClick={()=>deleteTodo(mongoId)}>Delete</button>
       {!isCompleted ? <button className="py-2 px-4 bg-green-500  text-white" onClick={()=>TodoUpdateHandler(mongoId)}>Done</button>:<span className=" emoji  py-2 px-4  text-white flex-col">😎</span>}</td>
    </tr>
  );
}

export default Todo;
