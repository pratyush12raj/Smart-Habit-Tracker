console.log("hello");

import express from "express"
import dotenv from "dotenv"
dotenv.config()
import cors from "cors"

import mongoose from "mongoose";
import Habit from "./Models/Habit.js";
import Log from "./Models/Log.js";
import User from "./Models/User.js"




const app = express()
app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{

    res.send("Backend Running 🚀")

})

// let users = []
// app.post("/signup",(req,res)=>{
//     const {name,email,pass} = req.body

//     users.push({name,email,pass})
//     res.json({message:"user created"})
// })

// app.post("/login",(req,res)=>{
//     const {email,pass} = req.body

//     const user = users.find(
//        user => user.email===email && user.pass===pass
//     )

//     if(!user){
//        return res.json({message:"invalid"})
//     }

//     res.json({message:"logged in"})
// })


// signup from postman n save in DB
app.post("/signup",async(req,res)=>{
    const {name,email,password} = req.body
    const user = new User({name,email,password})
    await user.save()

    res.json({message:"user created"})
})

// login from postman n save in DB
app.post("/login",async(req,res)=>{
    const {email,password} = req.body
    const user =await User.findOne({email,password})

    if(!user){
        return res.json({message:"Not found"})
    }

    res.json({message:"Login Success",user:user})
})





//  create new habit
app.post("/create-habit",async(req,res)=>{
    const {title,category,userId} =req.body
    const habit = new Habit({title,category,userId})
    await habit.save()
    res.json({message:"Habit Saved"})
})
// {
//     "title":"gym",
//     "category":"health"
// }


//  get newly create habit
app.get("/get-habit",async(req,res)=>{
    try {
        const {userId} = req.query
        const habits = await Habit.find({userId})
        res.json(habits)
    } catch (error) {
        console.log(error);
        
        res.json({message:"error in showing"})
    }
})
// [
//   {
//     "_id": "69fef95232fdb2a9f5e1db54",
//     "title": "Gym",
//     "category": "Health",
//     "__v": 0
//   }]



//  mark habit did or not & check 1 entry only per day
app.post("/mark",async(req,res)=>{
    const {did,userId}=req.body
    const marked = new Log({
        did,
        userId,
        date: new Date().toDateString()
    })
    const today = new Date().toDateString()
    const check = await Log.findOne({did,userId, date: today})
    if(!check){
        const marked= new Log({did,userId,date:today})
        await marked.save()
        return res.json({message:"Done"})
    }
     
    res.json({message:"Already did"})
})
// {  ye wala habit gym ka h jo aaj done hua
//   "did":"69ff26a1d4395eb17f54e524"
// }



// get all habit  did mark 
app.get("/logs", async (req, res) => {
  try {
    const {userId} = req.query
    const data = await Log.find({userId});
    res.json(data);
  } catch (err) {
    res.json({ message: "error fetching logs" });
  }
});
// [
//   {
//     "_id": "69ff25739970c4190f5f9e59",
//     "date": "Sat May 09 2026",
//     "__v": 0
//   },
//   {
//     "_id": "69ff27abd9686ed19b540c73",
//     "date": "Sat May 09 2026",
//     "did": "69ff26a1d4395eb17f54e524",
//     "__v": 0
//   },
//   {
//     "_id": "6a01821a98d1426c8980abcf",
//     "date": "Mon May 11 2026",
//     "did": "69ff26a1d4395eb17f54e524",
//     "__v": 0
//   }
// ]




//  streak cal of specific habit ki
app.get("/streak/:did",async(req,res)=>{
    const did = req.params.did
    const info = await Log.find({did})

    if(info.length > 0){
        const obj = info.length
        return res.json({message:"Your streak is",obj})
    }

    res.json({message:"NO Data found"})
})
// GET  httpsjbsdkjbkj/streak/69ff26a1d4395eb17f54e524
//  ye route hit krne pe streak milega
// {
//   "message": "Your streak is",
//   "obj": 2
// }

// app.delete("/remove/:did",async(req,res)=>{
//     const did = req.params.did
//     await Habit.findByIdAndDelete(did)
//     res.json({message:"Habit Deleted"})
// })

app.delete("/remove/:did",async(req,res)=>{

    const did = req.params.did


    // DELETE HABIT
    await Habit.findByIdAndDelete(did)


    // DELETE RELATED LOGS
    await Log.deleteMany({did})


    res.json({
        message:"Habit Deleted"
    })

})







// DB connection
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
    console.log("Connected to DB");
    })
 .catch((error)=> {
    console.log("Error in DB ",error);   
})


// app.listen(4000,()=>{
//     console.log("server is running");
    
// })

const PORT = process.env.PORT || 4000

app.listen(PORT,()=>{

    console.log(`server is running on ${PORT}`)

})