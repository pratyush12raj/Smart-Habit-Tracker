
import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
    title:String,
    category:String,
    userId:String
})

const Habit = mongoose.model("Habit",habitSchema)

export default Habit