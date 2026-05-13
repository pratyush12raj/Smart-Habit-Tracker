

import { useState } from "react"

import Signup from "./Components/Auth/Signup"
import Login from "./Components/Auth/Login"

import HabitDashboard from "./Components/Dashboard/HabitDashboard"

export default function App(){

    // const [page,setPage] = useState("signup")
       const user =
JSON.parse(localStorage.getItem("user"))

const [page,setPage] = useState(
    user ? "dashboard" : "signup"
)


    const [signupData,setSignupData] = useState({
        name:"",
        email:"",
        password:""
    })

    const [loginData,setLoginData] = useState({
        email:"",
        password:""
    })



    // SIGNUP
    async function signup(){

        const res = await fetch(
            "https://smart-habit-tracker-backend-a4do.onrender.com/",
            {
                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify(signupData)
            }
        )

        const data = await res.json()

        alert(data.message)

        setPage("login")
    }



    // LOGIN
    async function login(){

        const res = await fetch(
            "https://smart-habit-tracker-backend-a4do.onrender.com/",
            {
                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify(loginData)
            }
        )

        const data = await res.json()

        alert(data.message)

        if(data.message === "Login Success"){

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            )

            setPage("dashboard")
        }
    }



    return(

        <div className="min-h-screen bg-gradient-to-r from-[#081224] to-[#1d3557] flex items-center justify-center p-5">

            {
                page === "signup" && (

                    <Signup
                    signupData={signupData}
                    setSignupData={setSignupData}
                    signup={signup}
                    setPage={setPage}
                    />

                )
            }


            {
                page === "login" && (

                    <Login
                    loginData={loginData}
                    setLoginData={setLoginData}
                    login={login}
                    setPage={setPage}
                    />

                )
            }


            {
                page === "dashboard" && (

                    <HabitDashboard/>

                )
            }

        </div>

    )
}
