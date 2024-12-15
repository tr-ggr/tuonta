"use client";
import React from "react";
import { useState } from 'react';
import Link from 'next/link';

interface User {
    id: number | null
    username: string | null
    firstname: string | null
    lastName: string | null
    country: string | null
    city: string | null
    province: string | null
    street: string | null
    email: string | null
    birthday: string | null
    gender: string | null
    bio: string | null
    school: string | null
    role: string | null
    password: string | null
    course: string | null
    distance: number | null
    hobbies: string[] | null
    profileImages: string[] | null
    isAdmin: boolean | null
    isVerified: boolean | null
}

export let currentUser: User = {
    id: null,
    username: null,
    firstname: null,
    lastName: null,
    country: null,
    city: null,
    province: null,
    street: null,
    email: null,
    birthday: null,
    gender: null,
    bio: null,
    school: null,
    role: null,
    password: null,
    course: null,
    distance: null,
    hobbies: null,
    profileImages: null,
    isAdmin: null,
    isVerified: null,
};

export default function login(){

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e : any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e : any) => {
        console.log("Enetyred")
        e.preventDefault();
        try {
            const response = await fetch('https://localhost:7113/api/profiles', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) throw new Error('Invalid credentials');

            const users = await response.json() as User[];
            currentUser = users.filter((profile) => 
                profile.username == formData.username && profile.password == formData.password
            )[0];
    
            if (currentUser) {
                setSuccess('Login successful!');
                setError("");

                 // Store userId in document.cookie
                document.cookie = `userId=${currentUser.id}; path=/; max-age=${60 * 60 * 24}`;

                console.log(currentUser);
                console.log("Unique log");

                window.location.href = "/home"
            } else {
                alert("Wrong username or password")
            }

        
        } catch (err : any) {
            setError(err.message);
            setSuccess("");
            console.log(err)
        }
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
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
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
                            <button type="submit" className="drop-shadow-lg text-white bg-indigo-900 hover:bg-blue-800 font-bold rounded-full text-lg w-full h-11 flex items-center justify-center">
                            <span className="flex items-center space-x-3">
                                <span>Login</span>
                            </span>
                            </button>
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