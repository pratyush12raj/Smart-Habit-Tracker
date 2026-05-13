

export default function HabitCard({
    habit,
    streak,
    logs,
    markHabit,
    deleteHabit
}){

    // TOTAL DONE
    const totalDone =
    logs.filter(
        log => log.did === habit._id
    ).length



    // WEEKLY DONE
    const weeklyDone =
    logs.filter(log => {

        if(log.did !== habit._id){
            return false
        }

        const logDate =
        new Date(log.date)

        const today =
        new Date()

        const diff =
        today - logDate

        const days =
        diff / (1000 * 60 * 60 * 24)

        return days <= 7

    }).length



    return(

        <div className="bg-[#172a4d] rounded-3xl p-6 shadow-xl">

            {/* TOP */}

            <div className="flex justify-between items-center gap-3">

                <h3 className="text-3xl font-bold">
                    {habit.title}
                </h3>

                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                    {habit.category}
                </span>

            </div>



            {/* STATS */}

            <div className="mt-5 space-y-3 text-gray-300">

                <p className="text-lg">
                    🔥 Current Streak :
                    <span className="text-white font-bold ml-2">
                        {streak}
                    </span>
                </p>

                <p className="text-lg">
                    📅 Weekly Done :
                    <span className="text-white font-bold ml-2">
                        {weeklyDone}
                    </span>
                </p>

                <p className="text-lg">
                    ✅ Total Done :
                    <span className="text-white font-bold ml-2">
                        {totalDone}
                    </span>
                </p>

            </div>



            {/* BUTTONS */}

            <div className="flex gap-3 mt-8">

                <button
                onClick={()=>markHabit(habit._id)}
                className="flex-1 bg-gradient-to-r from-orange-400 to-pink-500 py-3 rounded-xl font-semibold"
                >
                    Done ✅
                </button>

                <button
                onClick={()=>deleteHabit(habit._id)}
                className="bg-red-500 px-5 rounded-xl"
                >
                    🗑️
                </button>

            </div>

        </div>

    )
}