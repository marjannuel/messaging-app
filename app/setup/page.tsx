

export default function SetupAccount(){

    return(
        <div className="min-h-dvh w-full overflow-x-hidden flex justify-center">
            <div className="max-w-191.75 w-full bg-neutral-800 text-white flex flex-col h-dvh">
                <div className="flex flex-col items-center gap-1 mt-2 px-2">
                    <h1 className="font-bold text-3xl">Setup Account</h1>
                    <h2>Some information are required, and the others can be configured later</h2>
                </div>
                <main className="flex flex-col items-center gap-2 mt-5">
                    <input className="w-48 h-48 border-2 rounded-full bg-neutral-700"
                    name="profilePicture"
                    type="file"
                    placeholder="">
                    
                    </input>
                    <input className="mx-2 px-2 border-2 py-1 rounded-2xl focus:border-yellow-500 focus:outline-0 hover:border-green-500 bg-neutral-700 mt-5"
                    placeholder="First Name (required)">
                
                    </input>
                    <input className="mx-2 px-2 border-2 py-1 rounded-2xl focus:border-yellow-500 focus:outline-0 hover:border-green-500 bg-neutral-700"
                    placeholder="Last Name (required)">
                
                    </input>
                    <input className="mx-2 px-2 border-2 py-1 rounded-2xl focus:border-yellow-500 focus:outline-0 hover:border-green-500 bg-neutral-700"
                    placeholder="Phone Number (required)">
                
                    </input>
                </main>
            </div>
        </div>
    )
}