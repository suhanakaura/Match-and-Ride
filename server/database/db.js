import mongoose from "mongoose"

async function connectDB(){
    try{
        await mongoose.connect("mongodb://localhost:27017/matchandride");
        console.log("database connected successfully ");
    }
    catch(err){
        console.log("something went wrong");
    }
}

export default connectDB;