
// import React, { useEffect, useMemo, useState } from "react";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Legend,
//   Bar,
// } from "recharts";

// const API = "http://localhost:4000";

// const COLORS = ["#fb923c", "#334155"];

// export default function HabitTrackerApp() {
//   const [habits, setHabits] = useState([]);
//   const [logs, setLogs] = useState([]);

//   const [signupData, setSignupData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [loginData, setLoginData] = useState({
//     email: "",
//     password: "",
//   });

//   const [habitData, setHabitData] = useState({
//     title: "",
//     category: "",
//   });

//   useEffect(() => {
//     loadHabits();
//     loadLogs();
//   }, []);

//   async function loadHabits() {
//     try {
//       const res = await fetch(`${API}/get-habit`);
//       const data = await res.json();
//       setHabits(data);
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   async function loadLogs() {
//     try {
//       const res = await fetch(`${API}/logs`);
//       const data = await res.json();
//       setLogs(data);
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   async function signup() {
//     const res = await fetch(`${API}/signup`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(signupData),
//     });

//     const data = await res.json();
//     alert(data.message);
//   }

//   async function login() {
//     const res = await fetch(`${API}/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(loginData),
//     });

//     const data = await res.json();
//     alert(data.message);
//   }

//   async function createHabit() {
//     if (!habitData.title || !habitData.category) {
//       return alert("Fill all fields");
//     }

//     const res = await fetch(`${API}/create-habit`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(habitData),
//     });

//     const data = await res.json();
//     alert(data.message);

//     setHabitData({
//       title: "",
//       category: "",
//     });

//     loadHabits();
//   }

//   async function markHabit(id) {
//     const res = await fetch(`${API}/mark`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ did: id }),
//     });

//     const data = await res.json();
//     alert(data.message);

//     loadLogs();
//   }

//   async function deleteHabit(id) {
//     await fetch(`${API}/remove/${id}`, {
//       method: "DELETE",
//     });

//     loadHabits();
//     loadLogs();
//   }

//   function getHabitStreak(id) {
//     return logs.filter((log) => log.did === id).length;
//   }

//   const bestStreak = useMemo(() => {
//     let max = 0;

//     habits.forEach((habit) => {
//       const streak = logs.filter((log) => log.did === habit._id).length;

//       if (streak > max) {
//         max = streak;
//       }
//     });

//     return max;
//   }, [habits, logs]);

//   const completedToday = useMemo(() => {
//     const today = new Date().toDateString();

//     return logs.filter((log) => log.date === today).length;
//   }, [logs]);

//   const pieData = [
//     {
//       name: "Completed",
//       value: completedToday,
//     },
//     {
//       name: "Remaining",
//       value: Math.max(habits.length - completedToday, 0),
//     },
//   ];

//   const weeklyData = useMemo(() => {
//     const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//     return days.map((day) => {
//       const count = logs.filter((log) => {
//         const logDay = new Date(log.date).toDateString().split(" ")[0];
//         return logDay === day;
//       }).length;

//       return {
//         day,
//         habits: count,
//       };
//     });
//   }, [logs]);

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-[#081224] to-[#1d3557] text-white p-5 md:p-10">
//       <div className="max-w-7xl mx-auto space-y-10">
//         {/* AUTH */}
//         <div className="grid md:grid-cols-2 gap-8">
//           {/* LOGIN */}
//           <div className="bg-[#10213f] rounded-[35px] overflow-hidden shadow-2xl">
//             <div className="bg-gradient-to-r from-orange-400 to-pink-500 h-40 rounded-b-[100px] flex flex-col items-center justify-center">
//               <h1 className="text-4xl font-bold">Welcome</h1>
//               <p className="text-sm opacity-80 mt-2">
//                 Sign in to continue
//               </p>
//             </div>

//             <div className="p-8 space-y-5">
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={loginData.email}
//                 onChange={(e) =>
//                   setLoginData({ ...loginData, email: e.target.value })
//                 }
//                 className="w-full bg-transparent border border-gray-500 rounded-xl px-4 py-3 outline-none"
//               />

//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={loginData.password}
//                 onChange={(e) =>
//                   setLoginData({ ...loginData, password: e.target.value })
//                 }
//                 className="w-full bg-transparent border border-gray-500 rounded-xl px-4 py-3 outline-none"
//               />

//               <button
//                 onClick={login}
//                 className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:scale-105 transition"
//               >
//                 Sign In
//               </button>
//             </div>
//           </div>

//           {/* SIGNUP */}
//           <div className="bg-[#10213f] rounded-[35px] overflow-hidden shadow-2xl">
//             <div className="bg-gradient-to-r from-orange-400 to-pink-500 h-40 rounded-b-[100px] flex flex-col items-center justify-center">
//               <h1 className="text-4xl font-bold">Create Account</h1>
//               <p className="text-sm opacity-80 mt-2">
//                 Join your productivity journey
//               </p>
//             </div>

//             <div className="p-8 space-y-5">
//               <input
//                 type="text"
//                 placeholder="Name"
//                 value={signupData.name}
//                 onChange={(e) =>
//                   setSignupData({ ...signupData, name: e.target.value })
//                 }
//                 className="w-full bg-transparent border border-gray-500 rounded-xl px-4 py-3 outline-none"
//               />

//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={signupData.email}
//                 onChange={(e) =>
//                   setSignupData({ ...signupData, email: e.target.value })
//                 }
//                 className="w-full bg-transparent border border-gray-500 rounded-xl px-4 py-3 outline-none"
//               />

//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={signupData.password}
//                 onChange={(e) =>
//                   setSignupData({
//                     ...signupData,
//                     password: e.target.value,
//                   })
//                 }
//                 className="w-full bg-transparent border border-gray-500 rounded-xl px-4 py-3 outline-none"
//               />

//               <button
//                 onClick={signup}
//                 className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:scale-105 transition"
//               >
//                 Create Account
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* DASHBOARD */}
//         <div className="bg-[#10213f] rounded-[35px] p-6 md:p-10 shadow-2xl space-y-10">
//           {/* TOP */}
//           <div className="flex flex-col lg:flex-row justify-between gap-6">
//             <div>
//               <h1 className="text-5xl font-bold">Habit Dashboard 🔥</h1>
//               <p className="text-gray-300 mt-3 text-lg">
//                 Track your daily progress
//               </p>
//             </div>

//             <div className="flex flex-col md:flex-row gap-4">
//               <input
//                 type="text"
//                 placeholder="Habit title"
//                 value={habitData.title}
//                 onChange={(e) =>
//                   setHabitData({ ...habitData, title: e.target.value })
//                 }
//                 className="bg-transparent border border-gray-500 rounded-xl px-5 py-3 outline-none"
//               />

//               <input
//                 type="text"
//                 placeholder="Category"
//                 value={habitData.category}
//                 onChange={(e) =>
//                   setHabitData({
//                     ...habitData,
//                     category: e.target.value,
//                   })
//                 }
//                 className="bg-transparent border border-gray-500 rounded-xl px-5 py-3 outline-none"
//               />

//               <button
//                 onClick={createHabit}
//                 className="bg-gradient-to-r from-orange-400 to-pink-500 px-7 py-3 rounded-xl font-semibold hover:scale-105 transition"
//               >
//                 Add Habit
//               </button>
//             </div>
//           </div>

//           {/* STATS */}
//           <div className="grid md:grid-cols-3 gap-6">
//             <div className="bg-[#172a4d] rounded-3xl p-6 shadow-lg">
//               <h2 className="text-gray-300">Total Habits</h2>
//               <p className="text-5xl font-bold mt-4">{habits.length}</p>
//             </div>

//             <div className="bg-[#172a4d] rounded-3xl p-6 shadow-lg">
//               <h2 className="text-gray-300">Completed Logs</h2>
//               <p className="text-5xl font-bold mt-4">{logs.length}</p>
//             </div>

//             <div className="bg-[#172a4d] rounded-3xl p-6 shadow-lg">
//               <h2 className="text-gray-300">Best Streak</h2>
//               <p className="text-5xl font-bold mt-4">{bestStreak}🔥</p>
//             </div>
//           </div>

//           {/* HABITS */}
//           <div>
//             <h2 className="text-4xl font-bold mb-6">Your Habits</h2>

//             <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
//               {habits.map((habit) => (
//                 <div
//                   key={habit._id}
//                   className="bg-[#172a4d] rounded-3xl p-6 shadow-xl hover:scale-[1.02] transition"
//                 >
//                   <div className="flex justify-between items-center gap-3">
//                     <h3 className="text-3xl font-bold break-words">
//                       {habit.title}
//                     </h3>

//                     <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm whitespace-nowrap">
//                       {habit.category}
//                     </span>
//                   </div>

//                   <p className="text-gray-300 mt-5 text-lg">
//                     Current Streak: {getHabitStreak(habit._id)}🔥
//                   </p>

//                   <div className="flex gap-3 mt-8">
//                     <button
//                       onClick={() => markHabit(habit._id)}
//                       className="flex-1 bg-gradient-to-r from-orange-400 to-pink-500 py-3 rounded-xl font-semibold hover:scale-105 transition"
//                     >
//                       Done ✅
//                     </button>

//                     <button
//                       onClick={() => deleteHabit(habit._id)}
//                       className="bg-red-500 px-5 rounded-xl hover:scale-105 transition"
//                     >
//                       🗑️
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* CHARTS */}
//           <div className="grid lg:grid-cols-2 gap-8">
//             <div className="bg-[#172a4d] rounded-3xl p-6 shadow-xl h-[450px]">
//               <h2 className="text-3xl font-bold mb-6">
//                 Completion Analytics
//               </h2>

//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={pieData}
//                     dataKey="value"
//                     nameKey="name"
//                     outerRadius={140}
//                     innerRadius={80}
//                     label
//                   >
//                     {pieData.map((entry, index) => (
//                       <Cell
//                         key={index}
//                         fill={COLORS[index % COLORS.length]}
//                       />
//                     ))}
//                   </Pie>

//                   <Tooltip />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>

//             <div className="bg-[#172a4d] rounded-3xl p-6 shadow-xl h-[450px]">
//               <h2 className="text-3xl font-bold mb-6">Weekly Activity</h2>

//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={weeklyData}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

//                   <XAxis dataKey="day" stroke="#fff" />
//                   <YAxis stroke="#fff" />

//                   <Tooltip />
//                   <Legend />

//                   <Bar
//                     dataKey="habits"
//                     fill="#fb923c"
//                     radius={[10, 10, 0, 0]}
//                   />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// import Home from "./Pages/Home"

// export default function App(){
//   return <Home/>
// }


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
            "http://localhost:4000/signup",
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
            "http://localhost:4000/login",
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