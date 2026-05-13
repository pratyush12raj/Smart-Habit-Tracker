
export default function Login({
    loginData,
    setLoginData,
    login,
    setPage
}){

    return(
        <div className="w-full max-w-md bg-[#10213f] rounded-[35px] overflow-hidden shadow-2xl">

            <div className="bg-gradient-to-r from-orange-400 to-pink-500 h-40 rounded-b-[100px] flex flex-col items-center justify-center">

                <h1 className="text-4xl font-bold text-white">
                    Welcome Back
                </h1>

                <p className="text-white/80 mt-2">
                    Login to continue
                </p>

            </div>

            <div className="p-8 space-y-5">

                <input
                type="email"
                placeholder="Email"
                value={loginData.email}
                onChange={(e)=>
                    setLoginData({
                        ...loginData,
                        email:e.target.value
                    })
                }
                className="w-full bg-transparent border border-gray-500 rounded-xl px-4 py-3 outline-none text-white"
                />

                <input
                type="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e)=>
                    setLoginData({
                        ...loginData,
                        password:e.target.value
                    })
                }
                className="w-full bg-transparent border border-gray-500 rounded-xl px-4 py-3 outline-none text-white"
                />

                <button
                onClick={login}
                className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:scale-105 transition"
                >
                    Login
                </button>


                <p className="text-center text-gray-300 pt-3">

                    Don’t have an account ?

                    <span
                    onClick={()=>setPage("signup")}
                    className="text-orange-400 cursor-pointer ml-2 font-semibold"
                    >
                        Signup
                    </span>

                </p>

            </div>

        </div>
    )
}