"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import React from "react";
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"   
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"


export default function signup(){
    const [date, setDate] = React.useState<Date>()
    const [isModalVisible, setModalVisible] = useState(false);
    const [others, setOthers] = useState(false);
 

    const [formData, setFormData] = useState({
        username: '',
        gender: '',
        specifygender:'',
        country: '',
        city: '',
        province: '',
        barangay:'',
        course: '',
        school: '',
        role: '',
        date: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmpassword: '',
    });
    
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    
    useEffect(() => {
        setFormData((prev) => ({
          ...prev,
          date: date ? date.toISOString() : "",
        }));
    }, [date]);

    function changeOuput(value : string){
        formData.gender = value
        if(value == "other"){
            setOthers(true)
        } else {
            setOthers(false)
        }
    }
    
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
        {/* Signup */}
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
                        <button data-modal-target="select-modal" data-modal-toggle="select-modal" type="button" onClick={() => setModalVisible(true)} className="drop-shadow-lg text-white bg-indigo-900 hover:bg-blue-800 font-bold rounded-full text-lg w-full h-11 flex items-center justify-center">
                        <span className="flex items-center space-x-3">
                            <span>Create account</span>
                        </span>
                        </button>
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

        {/* Profile Details 1 */}
        {isModalVisible && (
        <div id="select-modal" aria-hidden="true" className="bg-white flex-col overflow-y-hidden fixed right-0 z-50 h-screen w-screen">
            <nav className="w-full h-16 p-8 items-center justify-between flex gap-6 bg-[#240046] mb-12">
                <span className="text-3xl text-[#FDFDFD] font-bold">TuonTa</span>
            </nav>

            <div className="flex justify-center w-full h-screen">
                <div className="relative flex-col flex-wrap bg-fuchsia-100 w-3/5 h-4/5 space-y-5 p-10 rounded-3xl drop-shadow-lg ">
                    <div className="text-3xl font-bold text-indigo-950 px-10">Profile Details</div>
                    <form className = "flex-col flex-wrap content-center justify-center" onSubmit={handleSubmit}>
                    <div className="flex flex-wrap w-full h-4/5 px-10">
                        <div className="flex-col flex-wrap w-2/4 space-y-3">
                            <div>Username</div>
                            <div>
                                <input 
                                    type="text"
                                    name="username"
                                    placeholder="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                    className="bg-white w-[280px] h-10 border rounded-full pl-4"
                                /> 
                            </div>

                            <div>
                                <span>Birthday</span>
                            </div>
                            <div>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                        variant={"outline"} 
                                        className={cn(
                                            "w-[280px] justify-start text-left font-normal",
                                            "rounded-3xl",
                                            !date && "text-muted-foreground"
                                        )}
                                        >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? format(date, "PPP") : <span>MM/DD/YYYY</span>}
                                        </Button>

                                    </PopoverTrigger>    
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div>Gender</div>
                            <div>
                                <RadioGroup defaultValue="male" className="inline-grid grid-cols-2 gap-4" >
                                    <span className="flex items-center space-x-2 bg-white w-[150px] h-10 border rounded-full pl-4">
                                        <RadioGroupItem onClick={()=>changeOuput("male")} value = "male"  id="male" />
                                        <Label htmlFor="male" >Male</Label>
                                    </span>
                                    <span className="flex items-center space-x-2 bg-white w-[150px] h-10 border rounded-full pl-4">
                                        <RadioGroupItem value = "female" onClick={()=>changeOuput("female")}  id="female" />
                                        <Label htmlFor="female">Female</Label>
                                    </span>

                                    
                                    <span className="flex items-center space-x-2 bg-white w-[150px] h-10 border rounded-full pl-4">
                                        <RadioGroupItem value="other" onClick={()=>changeOuput("other")} id="other" />
                                        <Label htmlFor="other">Other</Label>
                                    </span>
                                    {others == true ? 
                                    <input
                                        type="text"
                                        placeholder="Specify"
                                        value={formData.specifygender || ''}
                                        onChange={handleChange}
                                        className="border rounded-full p-2 w-[150px]"
                                    />
                                     : null}
                                </RadioGroup>
                            </div>                  
                            <div>Location</div>
                            <div className="inline-grid grid-cols-2 gap-4">
                                <span>
                                    <div>
                                        <input 
                                            type="text"
                                            name="province"
                                            placeholder="Province"
                                            value={formData.province}
                                            onChange={handleChange}
                                            required
                                            className="bg-white w-[150px] h-10 border rounded-full pl-4"
                                        /> 
                                    </div>
                                </span>

                                <span>
                                    <div>
                                        <input 
                                            type="text"
                                            name="city"
                                            placeholder="City"
                                            value={formData.city}
                                            onChange={handleChange}
                                            required
                                            className="bg-white w-[150px] h-10 border rounded-full pl-4"
                                        /> 
                                    </div>
                                </span>
                                <span>
                                    <div>
                                        <input 
                                            type="text"
                                            name="barangay"
                                            placeholder="Barangay"
                                            value={formData.barangay}
                                            onChange={handleChange}
                                            required
                                            className="bg-white w-[150px] h-10 border rounded-full pl-4"
                                        /> 
                                    </div>
                                </span>
                                <span>
                                    <div>
                                        <input 
                                            type="text"
                                            name="country"
                                            placeholder="Country"
                                            value={formData.country}
                                            onChange={handleChange}
                                            required
                                            className="bg-white w-[150px] h-10 border rounded-full pl-4"
                                        /> 
                                    </div>
                                </span>
                            </div>
                            
                        </div>
                        <div className="flex-col flex-wrap w-2/4 space-y-3">
                            <div>Course and Year</div>
                            <div>
                                <input 
                                    type="text"
                                    name="course"
                                    placeholder="BSCS-3"
                                    value={formData.course}
                                    onChange={handleChange}
                                    required
                                    className="bg-white w-[280px] h-10 border rounded-full pl-4"
                                /> 
                            </div>
                            <div>School</div>
                            <div>
                                <input 
                                    type="text"
                                    name="school"
                                    placeholder="Cebu Institute of Technology"
                                    value={formData.school}
                                    onChange={handleChange}
                                    required
                                    className="bg-white w-[280px] h-10 border rounded-full pl-4"
                                /> 
                            </div>
                            <div>Role</div>
                            <RadioGroup defaultValue="comfortable" className="inline-grid grid-cols-2 gap-4">
                                <span className="flex items-center space-x-2 bg-white w-[150px] h-10 border rounded-full pl-4">
                                    <RadioGroupItem value="Tutor" onClick={()=>formData.role = "Tutor"} id="tutor" />
                                    <Label htmlFor="tutor">Tutor</Label>
                                </span>
                                <span className="flex items-center space-x-2 bg-white w-[150px] h-10 border rounded-full pl-4">
                                    <RadioGroupItem value="Listener" onClick={()=>formData.role = "Listener"} id="listener" />
                                    <Label htmlFor="listener">Listener</Label>
                                </span>
                            </RadioGroup>
                        </div>
                    </div> 
                    <div >
                            <button type="button" data-modal-hide = "select-modal" onClick={() => setModalVisible(false)} className="absolute right-10 bottom-10 drop-shadow-lg text-white bg-indigo-900 hover:bg-blue-800 rounded-full text-sm w-1/5 h-11 flex items-center justify-center">
                            <span className="flex items-center space-x-3">
                                <span>Continue</span>
                            </span>
                            </button>
                    </div>
                    </form>
                </div>
            </div>  
        </div>
        )}
    </div>
    );
}