'use client';
import { SetupAccount } from "@/app/actions"
import { ChangeEvent, useRef, useState } from "react";

export default function Setup(){
    const [authentication, setAuthentication] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const saveSetup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setAuthentication(true)

        const formData = new FormData(e.currentTarget);
        const result = await SetupAccount(formData);

        if (!result?.success){
            setAuthentication(false)
            setErrorMessage(result?.message)
        }
    }

    const handleCircleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
            
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);}
    };
    return(
        <div className="min-h-dvh w-full overflow-x-hidden flex justify-center">
            <div className="max-w-191.75 w-full bg-neutral-800 text-white flex flex-col min-h-dvh">
                <div className="flex flex-col items-center gap-1 mt-2 px-2">
                    <h1 className="font-bold text-3xl">Setup Account</h1>
                    <h2>Some information are required, and the others can be configured later</h2>
                </div>
                <form className="flex flex-col items-center gap-1 mt-5"
                onSubmit={saveSetup}>
                    <div
                        onClick={handleCircleClick}
                        className="relative w-48 h-48 rounded-full border-2 flex items-center justify-center cursor-pointer overflow-hidden hover:border-green-500 transition-colors"
                        style={{
                        backgroundImage: previewUrl ? `url(${previewUrl})` : "none",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        }}
                    >
                        {!previewUrl && (
                        <span className="text-gray-500 text-xs text-center px-2">
                            Click to upload photo
                        </span>
                        )}
                    </div>

                    <input
                        type="file"
                        name="profile_picture"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                    />
                    <div className="flex flex-col items-center justify-center mt-5">
                        <p>Username <span className="text-red-500">*</span></p>
                        <input className="mx-2 px-2 border-2 py-1 rounded-2xl focus:border-yellow-500 focus:outline-0 hover:border-green-500 bg-neutral-700 w-56"
                        name="username"
                        type="text"
                        pattern="^\S+$"
                        title="Usernames cannot contain spaces"
                        required>
                    
                        </input>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <p>First Name <span className="text-red-500">*</span></p>
                        <input className="mx-2 px-2 border-2 py-1 rounded-2xl focus:border-yellow-500 focus:outline-0 hover:border-green-500 bg-neutral-700 w-56"
                        name="first_name"
                        type="text"
                        required>
                    
                        </input>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <p>Last Name <span className="text-red-500">*</span></p>
                        <input className="mx-2 px-2 border-2 py-1 rounded-2xl focus:border-yellow-500 focus:outline-0 hover:border-green-500 bg-neutral-700 w-56"
                        name="last_name"
                        type="text"
                        required>
                    
                        </input>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <p>Phone Number <span className="text-red-500">*</span></p>
                        <input className="mx-2 px-2 border-2 py-1 rounded-2xl focus:border-yellow-500 focus:outline-0 hover:border-green-500 bg-neutral-700 w-56"
                        name="phone_number"
                        type="tel"
                        pattern="^(09\d{9}|\+639\d{10})$"
                        title="Please enter a valid 11-digit (09...) or 13-digit (+639...) number"
                        required>
                    
                        </input>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <p>Birthdate <span className="text-red-500">*</span></p>
                        <input className="mx-2 px-2 border-2 py-1 rounded-2xl focus:border-yellow-500 focus:outline-0 hover:border-green-500 bg-neutral-700 w-56"
                        name="birthdate"
                        type="text"
                        required
                        onFocus={(e) => (e.target.type = 'date')}
                        onBlur={(e) => {
                            if (!e.target.value) e.target.type = "text";
                        }}>
                
                    </input>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <p>Sex</p>
                        <select 
                            className="mx-2 px-2 border-2 py-1.5 rounded-2xl focus:border-yellow-500 focus:outline-0 hover:border-green-500 bg-neutral-700 w-56 cursor-pointer"
                            name="sex"
                            defaultValue={""}
                        >
                            <option value=""></option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <button className={`${authentication ? 'cursor-not-allowed bg-black' :' hover:bg-neutral-200 cursor-pointer'} mt-5 border-2 rounded-3xl py-2 w-55 border-white text-black bg-white`}
                    type="submit"
                    disabled={authentication}>
                        {authentication? 'Saving...' : 'Save'}
                    </button>
                    <p className="text-red-500 font-bold mt-1 mb-10">{errorMessage}</p>
                </form>
            </div>
        </div>
    )
}