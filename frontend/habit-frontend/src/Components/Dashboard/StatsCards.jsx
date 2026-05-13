
export default function StatsCards({
    habits,
    logs,
    bestStreak
}){

    return(
        <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-[#172a4d] rounded-3xl p-6">
                <h2>Total Habits</h2>

                <p className="text-5xl font-bold mt-4">
                    {habits.length}
                </p>
            </div>

            <div className="bg-[#172a4d] rounded-3xl p-6">
                <h2>Completed Logs</h2>

                <p className="text-5xl font-bold mt-4">
                    {logs.length}
                </p>
            </div>

            <div className="bg-[#172a4d] rounded-3xl p-6">
                <h2>Best Streak</h2>

                <p className="text-5xl font-bold mt-4">
                    {bestStreak}🔥
                </p>
            </div>

        </div>
    )
}