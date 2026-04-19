'use client'

export default function Home(){
    return(
        <div className="min-h-dvh w-full overflow-x-hidden flex justify-center">
            <div className="max-w-191.75 w-full bg-neutral-800 text-white flex flex-col min-h-dvh">
                <div className="flex items-center justify-start px-2 py-1 w-full gap-5 border-b bg-neutral-950">
                    <p>Profile Pic</p>
                    <p>Logo</p>
                </div>
                <main className="flex grow items-start px-2 w-full">
                    <input className="w-full mx-2 px-2 border-2 py-1 mt-2 rounded-2xl focus:border-yellow-500 focus:outline-0 hover:border-green-500 bg-neutral-700"
                    name="search"
                    type="text"
                    placeholder="Search chat">

                    </input>
                </main>
                <div className=" flex items-center justify-evenly px-2 w-full border-t bg-neutral-950">
                    <p className="border-r py-1 w-full text-center">Message</p>
                    <p className="py-1 w-full text-center">Settings</p>
                </div>
            </div>
        </div>
    )
}