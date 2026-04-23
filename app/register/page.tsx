'use client';
import Link from "next/link";
import { useState } from 'react';
import { RegisterAccount } from '@/app/actions';

export default function Signup(){

  const [authentication, setAuthentication] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [accCreate, setAccCreate] = useState(false)

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setAuthentication(true)

    const form = e.currentTarget;
    const formData = new FormData(e.currentTarget);
    const result = await RegisterAccount(formData);

    if (result?.success){
      setAccCreate(true)
      setErrorMessage(result?.message)
      setAuthentication(false)
      form.reset()
    }
    else{
      setAuthentication(false)
      setErrorMessage(result?.message)
      setAccCreate(false)
    }
  }

  return(
    <div className="min-h-dvh w-full overflow-x-hidden flex justify-center">
      <div className="max-w-191.75 w-full bg-neutral-800 text-white min-h-dvh">
        <main className="min-h-dvh flex flex-col justify-center items-center w-full">
          <form className="flex flex-col gap-1 justify-center items-center w-full"
          onSubmit={handleSignup}
          method="POST">
            <input className="border-2 border-neutral-600 rounded-2xl py-1 px-2 bg-neutral-700 focus:outline-none focus:border-yellow-500 w-55 hover:border-green-500"
            name="email"
            type='email'
            required
            placeholder="Enter Email">
          
            </input>
            <input className="border-2 border-neutral-600 rounded-2xl py-1 px-2 bg-neutral-700 focus:outline-none focus:border-yellow-500 w-55 hover:border-green-500"
            name="password"
            type="password"
            required
            placeholder="Create Password">
            
            </input>
            <button className={`${authentication ? 'cursor-not-allowed' : ' hover:bg-neutral-200 cursor-pointer'} mt-1 border-2 rounded-2xl py-1 w-55 border-white text-black bg-white`}
            type="submit"
            disabled={authentication}>
                {authentication? 'Creating Account' : 'Register'}
            </button>
          </form>
          <div className="flex justify-center items-center gap-2 mt-1">
            <Link href={'/'} className="text-blue-500 underline">Back to Login</Link>
          </div>
          <p className={`${accCreate ? 'text-green-500' : 'text-red-500'} font-bold mt-1`}>{errorMessage}</p>
        </main>
      </div>
    </div>
  )
}