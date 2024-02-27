//constom handler for http methode (get,put,patch,post)
import { NextResponse } from "next/server";
import { connectDB } from "../lib/config/db";
import TodoModel from "../lib/config/models/TodoModels";
//DB connection
const loadDB=async()=>{
    await connectDB();
}

loadDB();
//Get all ToDos
export async function GET(requst){
    const allTodos=await TodoModel.find({})
 return NextResponse.json({allTodos:allTodos})
}
//Create new ToDos
export async function POST(requst){
    const {title,description}= await requst.json()
    await TodoModel.create({
        title,
        description
    })
     console.log("route",TodoModel.title);
    return NextResponse.json({msg:"todo created"})
}
//Delete ToDos
export async function DELETE(request){
   const mongoId= await request.nextUrl.searchParams.get("mongoId");
   console.log('id',mongoId);
//   const mongoId=await request.NextUrl.searchParams.get('mongoId');
//   console.log("mongo",mongoId);
  await TodoModel.findByIdAndDelete(mongoId)
  return NextResponse.json({msg:"Todo deleted"})
}
//Update ToDos
export async function PUT(request){
    const mongoId= await request.nextUrl.searchParams.get("mongoId");
    await TodoModel.findByIdAndUpdate(mongoId,{
        $set:{
            isCompleted:true
        }
    })
    return NextResponse.json({msg:"ToDO Updated"})
}