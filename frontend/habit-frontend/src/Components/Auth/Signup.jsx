
export default function Signup({
    signupData,
    setSignupData,
    signup,
    setPage
}){

    return(
        <div className="w-full max-w-md bg-[#10213f] rounded-[35px] overflow-hidden shadow-2xl">

            <div className="bg-gradient-to-r from-orange-400 to-pink-500 h-40 rounded-b-[100px] flex flex-col items-center justify-center">

                <h1 className="text-4xl font-bold text-white">
                    Create Account
                </h1>

                <p className="text-white/80 mt-2">
                    Join your productivity journey
                </p>

            </div>

            <div className="p-8 space-y-5">

                <input
                type="text"
                placeholder="Name"
                value={signupData.name}
                onChange={(e)=>
                    setSignupData({
                        ...signupData,
                        name:e.target.value
                    })
                }
                className="w-full bg-transparent border border-gray-500 rounded-xl px-4 py-3 outline-none text-white"
                />

                <input
                type="email"
                placeholder="Email"
                value={signupData.email}
                onChange={(e)=>
                    setSignupData({
                        ...signupData,
                        email:e.target.value
                    })
                }
                className="w-full bg-transparent border border-gray-500 rounded-xl px-4 py-3 outline-none text-white"
                />

                <input
                type="password"
                placeholder="Password"
                value={signupData.password}
                onChange={(e)=>
                    setSignupData({
                        ...signupData,
                        password:e.target.value
                    })
                }
                className="w-full bg-transparent border border-gray-500 rounded-xl px-4 py-3 outline-none text-white"
                />

                <button
                onClick={signup}
                className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:scale-105 transition"
                >
                    Create Account
                </button>


                <p className="text-center text-gray-300 pt-3">

                    Already have an account ?

                    <span
                    onClick={()=>setPage("login")}
                    className="text-orange-400 cursor-pointer ml-2 font-semibold"
                    >
                        Login
                    </span>

                </p>

            </div>

        </div>
    )
}