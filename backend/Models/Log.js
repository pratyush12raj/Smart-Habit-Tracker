import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
    date:String,
    did:String,
    userId:String
})

const Log = mongoose.model("Log",logSchema)

export default Log