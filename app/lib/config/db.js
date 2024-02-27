//Data base Connection create
import mongoose from "mongoose"

export const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://abisharfath:Abi11abi@cluster0.sadyq6h.mongodb.net/Todo-app");
    console.log("db Connected");

} 