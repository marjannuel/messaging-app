

export default function SetupAccount(){

    return(
        <div className="min-h-dvh w-full overflow-x-hidden flex justify-center">
            <div className="max-w-191.75 w-full bg-neutral-800 text-white flex flex-col min-h-dvh">
                <div className="flex flex-col items-center gap-1 mt-2 px-2">
                    <h1 className="font-bold text-3xl">Setup Account</h1>
                    <h2>Some information are required, and the others can be configured later</h2>
                </div>
                <form className="flex flex-col items-center gap-1 mt-5">
                    <input className="w-48 h-48 border-2 rounded-full bg-neutral-700"
                    name="profilePicture"
                    type="file"
                    placeholder="">
                    
                    </input>
                    <div className="flex flex-col items-center justify-center mt-5">
                        <p>Username</p>
                        <input className="mx-2 px-2 border-2 py-1 rounded-2xl focus:border-yellow-500 focus:outline-0 hover:border-green-500 bg-neutral-700 border-red-500 w-56"
                        name="username"
                        type="text"
                        pattern="^\S+$"
                        title="Usernames cannot contain spaces"
                        required>
                    
                        </input>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <p>First Name</p>
                        <input className="mx-2 px-2 border-2 py-1 rounded-2xl focus:border-yellow-500 focus:outline-0 hover:border-green-500 bg-neutral-700 border-red-500 w-56"
                        name="first_name"
                        type="text"
                        required>
                    
                        </input>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <p>Last Name</p>
                        <input className="mx-2 px-2 border-2 py-1 rounded-2xl focus:border-yellow-500 focus:outline-0 hover:border-green-500 bg-neutral-700 border-red-500 w-56"
                        name="last_name"
                        type="text"
                        required>
                    
                        </input>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <p>Phone Number</p>
                        <input className="mx-2 px-2 border-2 py-1 rounded-2xl focus:border-yellow-500 focus:outline-0 hover:border-green-500 bg-neutral-700 border-red-500 w-56"
                        name="phone_number"
                        type="tel"
                        pattern="^(09\d{9}|\+639\d{10})$"
                        title="Please enter a valid 11-digit (09...) or 13-digit (+639...) number"
                        required>
                    
                        </input>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <p>Birthdate</p>
                        <input className="mx-2 px-2 border-2 py-1 rounded-2xl focus:border-yellow-500 focus:outline-0 hover:border-green-500 bg-neutral-700 w-56"
                        name="birthdate"
                        type="date">
                
                    </input>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <p>Sex</p>
                        <select 
                            className="mx-2 px-2 border-2 py-1.5 rounded-2xl focus:border-yellow-500 focus:outline-0 hover:border-green-500 bg-neutral-700 w-56 cursor-pointer"
                            name="sex"
                            defaultValue={""}
                        >
                            <option value="">Prefer not to say</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </form>
            </div>
        </div>
    )
}