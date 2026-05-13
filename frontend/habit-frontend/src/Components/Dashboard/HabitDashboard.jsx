

import { useEffect, useMemo, useState } from "react"

import {
    getHabits,
    getLogs,
    createHabit,
    markHabit,
    deleteHabit
} from "../../Services/api"

import StatsCards from "./StatsCards"
import HabitList from "./HabitList"
import Charts from "./Charts"
import AddHabit from "./AddHabit"

import { Droplets } from "lucide-react"



export default function HabitDashboard(){

    const user =
    JSON.parse(localStorage.getItem("user"))

    const [habits,setHabits] = useState([])
    const [logs,setLogs] = useState([])

    const [habitData,setHabitData] = useState({
        title:"",
        category:""
    })



    // LOGOUT
    function logout(){

        localStorage.removeItem("user")

        window.location.reload()
    }



    async function loadData(){

        const h =
        await getHabits(user._id)

        const l =
        await getLogs(user._id)

        setHabits(h)
        setLogs(l)
    }



    useEffect(()=>{

        loadData()

    },[])



    async function handleCreateHabit(){

        if(
            !habitData.title ||
            !habitData.category
        ){
            return alert("Fill all fields")
        }

        const data =
        await createHabit({
            ...habitData,
            userId:user._id
        })

        alert(data.message)

        setHabitData({
            title:"",
            category:""
        })

        loadData()
    }



    async function handleMark(id){

        const data =
        await markHabit(id)

        alert(data.message)

        loadData()
    }



    async function handleDelete(id){

        await deleteHabit(id)

        loadData()
    }



    function getHabitStreak(id){

        return logs.filter(
            log => log.did === id
        ).length
    }



    const bestStreak = useMemo(()=>{

        let max = 0

        habits.forEach(habit => {

            const streak =
            logs.filter(
                log => log.did === habit._id
            ).length

            if(streak > max){
                max = streak
            }

        })

        return max

    },[habits,logs])



    return(

        <div className="w-full min-h-screen bg-gradient-to-r from-[#081224] to-[#1d3557] text-white p-5 md:p-10">

            <div className="max-w-7xl mx-auto space-y-10">

                <div className="bg-[#10213f] rounded-[35px] p-6 md:p-10 shadow-2xl space-y-10">



                    {/* TOP SECTION */}

                    <div className="flex flex-col lg:flex-row justify-between gap-6">

                        {/* LEFT */}

                        <div>

                            <h2 className="text-orange-400 text-2xl font-semibold flex items-center gap-2">
                                Hello {user.name} 👋
                            </h2>

                            <div className="flex items-center gap-4 mt-2">

                                <h1 className="text-5xl md:text-6xl font-bold">
                                    Habit Dashboard
                                </h1>

                                🔥

                            </div>

                            <p className="text-gray-300 mt-3 text-lg">
                                Track your daily progress
                            </p>

                        </div>



                        {/* RIGHT */}

                        <div className="flex flex-col md:flex-row gap-4 items-center">

                            {/* WATER DROP */}

                            <div className="bg-[#172a4d] p-4 rounded-2xl shadow-xl">

                                <Droplets
                                size={35}
                                className="text-cyan-400"
                                />

                            </div>



                            {/* ADD HABIT */}

                            <AddHabit
                            habitData={habitData}
                            setHabitData={setHabitData}
                            createHabit={handleCreateHabit}
                            />



                            {/* LOGOUT */}

                            <button
                            onClick={logout}
                            className="bg-red-500 hover:bg-red-600 transition px-6 py-4 rounded-2xl font-bold"
                            >
                                Logout
                            </button>

                        </div>

                    </div>



                    {/* STATS */}

                    <StatsCards
                    habits={habits}
                    logs={logs}
                    bestStreak={bestStreak}
                    />



                    {/* HABITS */}

                    <HabitList
                    habits={habits}
                    logs={logs}
                    markHabit={handleMark}
                    deleteHabit={handleDelete}
                    />



                    {/* CHARTS */}

                    <Charts
                    habits={habits}
                    logs={logs}
                    />

                </div>

            </div>

        </div>
    )
}