'use client'
import { GetUserProfile, GetAllUsers} from "@/app/actions"
import { useState, useEffect } from "react"

export default function Home(){
    const [avatar, setAvatar] = useState('https://api.dicebear.com/7.x/bottts/svg?=')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [query, setQuery] = useState('')
    const [nameFound, setNameFound] = useState<any[]>()

    useEffect(() => {
        async function fetchProfile(){
            const data = await GetUserProfile()
            
            setAvatar(data?.avatar_url)
            setFirstName(data?.first_name)
            setLastName(data?.last_name)
        }
        fetchProfile()
    }, [])

    useEffect(() => {
        const triggerSearch = setTimeout(async () => {
            if (!query.trim()) {
                setNameFound([]);
                return;
            }

            const nameList = await GetAllUsers(query);
            setNameFound(nameList || []);
        }, 300);

        return () => clearTimeout(triggerSearch);
    }, [query]);

    return(
        <div className="min-h-dvh w-full overflow-x-hidden flex justify-center">
            <div className="max-w-191.75 w-full bg-neutral-800 text-white flex flex-col min-h-dvh">
                <div className="flex items-center justify-start px-2 py-2 w-full gap-2 border-b bg-neutral-700 border-neutral-600">
                    <div className="border-2 w-12 h-12 rounded-full overflow-hidden bg-black">
                        <img src={avatar} className="w-full h-full object-cover" alt="Profile Picture"></img>
                    </div>
                    <p>
                        <span>{firstName} </span>
                        <span>{lastName}</span>
                    </p>
                </div>
                <main className="flex grow items-start px-2 w-full">
                    <div className="flex flex-col w-full">
                        <input className="w-full px-2 border-2 py-1 mt-2 rounded-2xl focus:border-yellow-500 focus:outline-0 hover:border-green-500 bg-neutral-700 border-neutral-600"
                        name="search"
                        type="text"
                        placeholder="Chat with..."
                        value={query}
                        autoComplete="off"
                        onChange={(e) => {
                            setQuery(e.target.value)
                        }}>

                        </input>
                        {nameFound && query.length > 0 && (
                            <ul className="mt-1">
                                {nameFound.map((name) => (
                                <li 
                                className="flex items-center gap-2 p-2 hover:bg-neutral-600 cursor-pointer"
                                onClick={() => setQuery(`${name.first_name} ${name.last_name}`)}
                                key={name.id}>
                                    <div className="border-2 w-12 h-12 rounded-full overflow-hidden bg-black">
                                        <img src={name.avatar_url} className="w-full h-full object-cover" alt="Profile Picture"></img>
                                    </div>
                                    <span>{name.first_name} {name.last_name}</span>
                                </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </main>
                <div className=" flex items-center justify-evenly px-2 w-full border-t bg-neutral-700 border-neutral-600">
                    <p className="border-r py-1 w-full text-center border-neutral-600">Message</p>
                    <p className="py-1 w-full text-center">Settings</p>
                </div>
            </div>
        </div>
    )
}