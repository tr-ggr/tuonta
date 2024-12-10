"use client";
import React from "react";
import Link from 'next/link';
import { useState } from 'react';
import {DatePicker} from "@nextui-org/date-picker";

export default function Registration1(){

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmpassword: '',
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
        e.preventDefault();

        // try {
        //   const response = await fetch('/api/login', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(formData),
        //   });

        //   if (!response.ok) throw new Error('Invalid credentials');

        //   const data = await response.json();
        //   setSuccess('Login successful!');
        //   setError("");
        //   console.log('User token:', data.token);
        // } catch (err : any) {
        //   setError(err.message);
        //   setSuccess("");
        // }
    };

    return(
        <div className="flex-col overflow-y-hidden h-screen">
            <nav className="w-full h-16 p-8 items-center justify-between flex gap-6 bg-[#240046] mb-12">
                <span className="text-3xl text-[#FDFDFD] font-bold">TuonTa</span>
            </nav>

            <div className="flex justify-center w-full h-screen">
                <div className="relative flex-col flex-wrap content-center bg-fuchsia-100 w-3/5 h-4/5 space-y-5 p-10 rounded-3xl drop-shadow-lg ">
                    <div className="text-3xl font-bold text-indigo-950 px-10">Profile Details</div>
                    <div className="flex flex-wrap w-full h-4/5 px-10">
                        <div className="flex-col flex-wrap w-2/4">
                            <div>Username</div>
                            <div>
                                <span>Birthday</span>
                                <DatePicker className="max-w-[284px]" label="Birth date" />
                            </div>
                            <div>Gender</div>
                            <div>Location</div>
                        </div>

                        <div className="flex-col flex-wrap w-2/4">
                            <div>Course and Year</div>
                            <div>School</div>
                            <div>Role</div>
                        </div>
                    </div>
                    
                    <div >
                        <Link href = "/signup">
                            <button type="submit" className="absolute right-10 bottom-10 drop-shadow-lg text-white bg-indigo-900 hover:bg-blue-800 rounded-full text-sm w-1/5 h-11 flex items-center justify-center">
                            <span className="flex items-center space-x-3">
                                <span>Continue</span>
                            </span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            
        </div>
    )
}