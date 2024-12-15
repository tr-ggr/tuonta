"use client";
import { useState } from 'react';
import Link from 'next/link';
import React from "react";


export default function signup(){

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

    return (
    <div className="flex flex-wrap space-x-32 items-center">
        <div className="bg-[url('/images/SignupBG.png')] bg-cover bg-center bg-no-repeat w-2/4 h-screen"></div>
        <div className="flex-col flex-wrap space-y-8 content-center items-center h-screen">
            <div className="flex w-full justify-center">
                <div className="bg-[url('/images/TuonTaLOGO.png')] bg-cover bg-center bg-no-repeat w-3/5 h-24"></div>
            </div>
            <div className="flex-col flex-wrap content-center bg-fuchsia-100 h-4/6 space-y-5 px-10 rounded-3xl drop-shadow-lg">
                <div className="text-4xl font-bold text-indigo-950">Create an account</div>
                <div>Please enter your details</div>
                <form className = "flex-col flex-wrap content-center justify-center space-y-5" onSubmit={handleSubmit}>
                    <div className="flex flex-wrap space-x-5">
                        <div>
                            <input 
                                type="text"
                                name="firstname"
                                placeholder="First name"
                                value={formData.firstname}
                                onChange={handleChange}
                                required
                                className="bg-white w-full h-10 border border-neutral-400 rounded-full pl-4"
                            /> 
                        </div>

                        <div>
                            <input 
                                type="text"
                                name="lastname"
                                placeholder="Last name"
                                value={formData.lastname}
                                onChange={handleChange}
                                required
                                className="bg-white w-full h-10 border border-neutral-400 rounded-full pl-4"
                            /> 
                        </div>
                    </div>

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
                        <input 
                            type="password"
                            name="confirmpassword"
                            placeholder="Confirm password"
                            value={formData.confirmpassword}
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
                    <Link href = "/login">
                        <span className="font-bold text-indigo-900 hover:text-blue-800 hover:underline">Sign in</span>
                    </Link>

                </div>
            </div>
        </div>
    </div>
    );
}