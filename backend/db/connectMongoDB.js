import mongoose from "mongoose";
const connectdb =  async () => {
try{
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("connected to database");
}catch(error){
    console.log("Error: ", error);
}}

export default connectdb;
