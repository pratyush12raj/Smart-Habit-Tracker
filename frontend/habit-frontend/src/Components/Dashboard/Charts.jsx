
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Bar,
} from "recharts"

const COLORS = ["#fb923c","#334155"]

export default function Charts({habits,logs}){

    const today = new Date().toDateString()

    const completedToday =
    logs.filter(log => log.date === today).length

    const pieData = [
        {
            name:"Completed",
            value:completedToday
        },
        {
            name:"Remaining",
            value:Math.max(habits.length-completedToday,0)
        }
    ]

    const weeklyData = [
        {day:"Sun",habits:0},
        {day:"Mon",habits:0},
        {day:"Tue",habits:0},
        {day:"Wed",habits:0},
        {day:"Thu",habits:0},
        {day:"Fri",habits:0},
        {day:"Sat",habits:0},
    ]

    logs.forEach(log=>{

        const day =
        new Date(log.date)
        .toDateString()
        .split(" ")[0]

        const found =
        weeklyData.find(item => item.day === day)

        if(found){
            found.habits += 1
        }

    })

    return(
        <div className="grid lg:grid-cols-2 gap-8">

            <div className="bg-[#172a4d] rounded-3xl p-6 h-[450px]">

                <h2 className="text-3xl font-bold mb-6">
                    Completion Analytics
                </h2>

                <ResponsiveContainer width="100%" height="100%">

                    <PieChart>

                        <Pie
                        data={pieData}
                        dataKey="value"
                        outerRadius={130}
                        innerRadius={80}
                        label
                        >

                            {
                                pieData.map((entry,index)=>(
                                    <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                    />
                                ))
                            }

                        </Pie>

                        <Tooltip/>
                        <Legend/>

                    </PieChart>

                </ResponsiveContainer>

            </div>

            <div className="bg-[#172a4d] rounded-3xl p-6 h-[450px]">

                <h2 className="text-3xl font-bold mb-6">
                    Weekly Activity
                </h2>

                <ResponsiveContainer width="100%" height="100%">

                    <BarChart data={weeklyData}>

                        <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#334155"
                        />

                        <XAxis dataKey="day" stroke="#fff"/>
                        <YAxis stroke="#fff"/>

                        <Tooltip/>
                        <Legend/>

                        <Bar
                        dataKey="habits"
                        fill="#fb923c"
                        radius={[10,10,0,0]}
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>
    )
}