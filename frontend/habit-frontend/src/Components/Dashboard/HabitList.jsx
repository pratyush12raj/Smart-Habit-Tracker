
import HabitCard from "./HabitCard"

export default function HabitList({
    habits,
    logs,
    markHabit,
    deleteHabit
}){

    function getHabitStreak(id){

        return logs.filter(
            log => log.did === id
        ).length
    }



    return(

        <div>

            <h2 className="text-4xl font-bold mb-6">
                Your Habits
            </h2>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

                {
                    habits.map(habit => (

                        <HabitCard
                        key={habit._id}
                        habit={habit}
                        streak={getHabitStreak(habit._id)}
                        logs={logs}
                        markHabit={markHabit}
                        deleteHabit={deleteHabit}
                        />

                    ))
                }

            </div>

        </div>

    )
}