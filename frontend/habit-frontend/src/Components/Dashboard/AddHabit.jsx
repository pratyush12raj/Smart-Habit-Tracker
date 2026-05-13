
export default function AddHabit({
    habitData,
    setHabitData,
    createHabit
}){

    return(
        <div className="flex flex-col md:flex-row gap-4">

            <input
            type="text"
            placeholder="Habit title"
            value={habitData.title}
            onChange={(e)=>
                setHabitData({
                    ...habitData,
                    title:e.target.value
                })
            }
            className="bg-transparent border border-gray-500 rounded-xl px-5 py-3 outline-none"
            />

            <input
            type="text"
            placeholder="Category"
            value={habitData.category}
            onChange={(e)=>
                setHabitData({
                    ...habitData,
                    category:e.target.value
                })
            }
            className="bg-transparent border border-gray-500 rounded-xl px-5 py-3 outline-none"
            />

            <button
            onClick={createHabit}
            className="bg-gradient-to-r from-orange-400 to-pink-500 px-7 py-3 rounded-xl font-semibold"
            >
                Add Habit
            </button>

        </div>
    )
}