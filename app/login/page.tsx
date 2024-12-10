"use client";
import React from "react";
import { useState } from 'react';
import Link from 'next/link';

export default function login(){

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e : any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e : any) => {
        e.preventDefault();

        // try {
        //     const response = await fetch('/api/login', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(formData),
        //     });

        //     if (!response.ok) throw new Error('Invalid credentials');

        //     const data = await response.json();
        //     setSuccess('Login successful!');
        //     setError(null);
        //     console.log('User token:', data.token);
        // } catch (err : any) {
        //     setError(err.message);
        //     setSuccess(null);
        // }
    };
      
    return (
        <div className="flex flex-wrap content-center h-screen w-full">
            <div className="flex-col flex-wrap justify-center content-center items-center h-screen w-2/4 p-36">
                <div className="bg-[url('/images/TuonTaLOGO.png')] bg-cover bg-center bg-no-repeat w-full h-1/4"></div>
                <div className="bg-[url('/images/LoginBG.png')] bg-cover bg-center bg-no-repeat w-full h-3/4"></div>
            </div>

            <div className="flex-col w-2/4 content-center items-center justify-center p-7 pr-32">
                <div className="flex-col flex-wrap content-center bg-fuchsia-100 w-full h-4/6 space-y-5 px-10 rounded-3xl drop-shadow-lg">
                    <div className="text-4xl font-bold text-indigo-950  px-10">Welcome back!</div>
                    <div className="px-10">Please enter your details</div>

                    <form className = "flex-col flex-wrap content-center justify-center space-y-5 px-10" onSubmit={handleSubmit}>
                        <div>
                            <input 
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="bg-white w-full h-10 border border-neutral-400 rounded-full pl-4"
                            /> 
                        </div>

                        <div>
                            <input 
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="bg-white w-full h-10 border border-neutral-400 rounded-full pl-4"
                            /> 
                        </div>

                        <div>
                            <Link href = "/signup">
                                <button type="submit" className="drop-shadow-lg text-white bg-indigo-900 hover:bg-blue-800 font-bold rounded-full text-lg w-full h-11 flex items-center justify-center">
                                <span className="flex items-center space-x-3">
                                    <span>Create account</span>
                                </span>
                                </button>
                            </Link>
                        </div>
                    </form>

                    <div className="flex justify-center space-x-2">
                        <span>Already have an account? </span> 
                        <Link href = "/signup">
                            <span className="font-bold text-indigo-900 hover:text-blue-800 hover:underline">Sign up</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}