
const API = "http://localhost:4000"

export async function getHabits(userId){

    const res =
    await fetch(
        `${API}/get-habit?userId=${userId}`
    )

    return res.json()
}



export async function getLogs(userId){

    const res = await fetch(`${API}/logs?userId=${userId}`)

    return res.json()
}



export async function createHabit(data){

    const res =
    await fetch(`${API}/create-habit`,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(data)
    })

    return res.json()
}



export async function markHabit(id){

    const user =
    JSON.parse(localStorage.getItem("user"))

    const res =
    await fetch(`${API}/mark`,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            did:id,
            userId:user._id
        })
    })

    return res.json()
}


export async function deleteHabit(id){

    const res =
    await fetch(`${API}/remove/${id}`,{

        method:"DELETE"
    })

    return res.json()
}