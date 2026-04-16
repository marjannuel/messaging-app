'use client';
import Link from "next/link";
import { useState } from 'react';
import { AccountCheck } from '@/app/actions';

export default function Login(){
  const [authentication, setAuthentication] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setAuthentication(true)

    const formData = new FormData(e.currentTarget);
    const result = await AccountCheck(formData);

    if (!result?.success){
      setAuthentication(false)
      setErrorMessage(result?.message)
    }
  }

  return(
    <div className="min-h-dvh w-full overflow-x-hidden flex justify-center">
      <div className="max-w-191.75 w-full bg-neutral-800 text-white">
        <main className="min-h-dvh flex flex-col justify-center items-center w-full">
          <form className="flex flex-col gap-1 justify-center items-center w-full"
          onSubmit={handleLogin}>
            <input className="border-2 border-white rounded-2xl py-1 px-2 bg-neutral-700 focus:outline-none focus:border-yellow-500 w-55 hover:border-green-500"
            name="email"
            type='email'
            required
            placeholder="Email">
          
            </input>
            <input className="border-2 border-white rounded-2xl py-1 px-2 bg-neutral-700 focus:outline-none focus:border-yellow-500 w-55 hover:border-green-500"
            name="password"
            type="password"
            required
            placeholder="Password">
            
            </input>
            <button className={`${authentication ? 'cursor-not-allowed bg-black' :' hover:bg-neutral-200 cursor-pointer'} mt-1 border-2 rounded-2xl py-1 w-55 border-white text-black bg-white`}
            type="submit"
            disabled={authentication}>
              {authentication? 'Authenticating...' : 'Login'}
            </button>
          </form>
          <div className="flex justify-center items-center gap-2 mt-1">
            <p>No Accout Yet?</p>
            <Link href={'/register'} className="text-blue-500 underline">Sign Up</Link>
          </div>
          <p className="text-red-500 font-bold mt-1">{errorMessage}</p>
        </main>
      </div>
    </div>
  )
}