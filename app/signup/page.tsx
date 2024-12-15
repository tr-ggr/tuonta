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
    const [others, setOthers] = useState("");
    const [roles, setRoles] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [emailValid, setEmailValid] = useState(true);
    const [confirmpass, setConfirm] = useState("");
    const validatePasswords = () => {
        if (formData.password !== confirmpass) {
            setPasswordsMatch(false);
        } else {
            setPasswordsMatch(true);
            setModalVisible(true);
        }
    };

    const validateEmail = (email : any) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (e : any) => {
        handleChange(e);
        setEmailValid(validateEmail(e.target.value));
    };

    const [formData, setFormData] = useState({
        username: '',
        gender: '',
        country: '',
        city: '',
        province: '',
        street:'',
        course: '',
        school: '',
        role: '',
        date: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    });
    
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    
    useEffect(() => {
        setFormData((prev) => ({
          ...prev,
          date: date ? date.toISOString() : "",
        }));
    }, [date]);
    
    const handleChange = (e : any) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
    };
    
    const handleSubmit = async (e : any) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/profiles/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Invalid credentials');

      const data = await response.json();
      setSuccess('Login successful!');
      setError("");
      console.log('User token:', data.token);
    } catch (err : any) {
      setError(err.message);
      setSuccess("");
    }
    };

    return (
    <div >
        <form className="flex flex-wrap space-x-32 items-center" onSubmit={handleSubmit}>
            {/* Signup */}
            <div className="bg-[url('/images/SignupBG.png')] bg-cover bg-center bg-no-repeat w-2/4 h-screen"></div> 
            <div className="flex-col flex-wrap space-y-8 content-center items-center h-screen">
                <div className="flex w-full justify-center">
                    <div className="bg-[url('/images/TuonTaLOGO.png')] bg-cover bg-center bg-no-repeat w-3/5 h-24"></div>
                </div>
                <div className="flex-col flex-wrap content-center bg-fuchsia-100 h-4/6 space-y-5 px-10 rounded-3xl drop-shadow-lg">
                    <div className="text-4xl font-bold text-indigo-950">Create an account</div>
                    <div>Please enter your details</div>
                    <div className= "flex-col flex-wrap content-center justify-center space-y-5">
                    
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
                                onChange={handleEmailChange}
                                required
                                className="bg-white w-full h-10 border border-neutral-400 rounded-full pl-4"
                            /> 
                        </div>
                        <div>
                            {!emailValid && <p className="text-red-600 text-sm">Invalid email address</p>}
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
                                placeholder="Confirm password"
                                value={confirmpass}
                                onChange={(e) => setConfirm(e.target.value)}
                                required
                                className="bg-white w-full h-10 border border-neutral-400 rounded-full pl-4"
                            /> 
                        </div>

                        <div>
                        {!passwordsMatch && <p className="text-red-600 text-sm">Passwords do not match</p>}
                        </div>

                        <div>
                            <button data-modal-target="select-modal" data-modal-toggle="select-modal" type="button" onClick={validatePasswords} className="drop-shadow-lg text-white bg-indigo-900 hover:bg-blue-800 font-bold rounded-full text-lg w-full h-11 flex items-center justify-center">
                            <span className="flex items-center space-x-3">
                                <span>Create account</span>
                            </span>
                            </button>
                        </div>
                    </div>
                
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
                        <div className = "flex-col flex-wrap content-center justify-center">
                        <div className="flex flex-wrap w-full h-4/5 px-10">
                            <div className="flex-col flex-wrap w-2/4 space-y-4">
                                <div className="font-bold">Username</div>
                                <div>
                                    <input 
                                        type="text"
                                        name="username"
                                        placeholder="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                        className="bg-white w-[320px] text-black h-10 border rounded-full pl-4"
                                    /> 
                                </div>

                                <div className="font-bold">
                                    <span>Birthday</span>
                                </div>
                                <div>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                            variant={"outline"} 
                                            className={cn(
                                                "w-[320px] justify-start text-left font-normal",
                                                "rounded-3xl",
                                                !date && "text-black"
                                            )}
                                            >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date ? format(date, "PPP") : <span className="text-gray-500">MM/DD/YYYY</span>}
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
                                <div className="font-bold">Gender</div>
                                <div>
                                    <RadioGroup defaultValue="comfortable" className="inline-grid grid-cols-2 gap-4" >
                                        <span onClick={()=>{formData.gender="male"; setOthers("male"); 'bg-green-500'}} className={`${others == "male" ? 'bg-red-300 text-black' : 'bg-white text-gray-500'} cursor-pointer  flex items-center space-x-2 hover:drop-shadow-lg hover:bg-red-300  hover:text-black w-[150px] h-10 border rounded-full pl-4`}>
                                            <RadioGroupItem className = "hidden peer" value = "male"  id="male" />
                                            <Label htmlFor="male">Male</Label>
                                        </span> 

                                        <span onClick={()=>{formData.gender="female", setOthers("female")}} className={`${others == "female" ? 'bg-red-300 text-black' : 'bg-white text-gray-500'} flex items-center space-x-2 hover:drop-shadow-lg  peer-checked:bg-red-300 peer-checked:text-black hover:bg-red-300 hover:text-black w-[150px] h-10 border rounded-full pl-4`}>
                                            <RadioGroupItem className = "hidden peer" value = "female"  id="female" />
                                            <Label htmlFor="female">Female</Label>
                                        </span>

                                        <span onClick={()=>{setFormData({ ...formData, gender: "" }); setOthers("others")}} className={`${others == "others" ? 'bg-red-300 text-black' : 'bg-white text-gray-500'} flex items-center space-x-2 hover:drop-shadow-lg peer-checked:bg-red-300 peer-checked:text-black  w-[150px] hover:bg-red-300 hover:text-black h-10 border rounded-full pl-4`}>
                                            <RadioGroupItem className = "hidden peer" value="other"  id="other" />
                                            <Label htmlFor="other">Other</Label>
                                        </span>
                                        {others == "others" ?
                                        <input
                                            type="text"
                                            placeholder="Specify"
                                            value={formData.gender || ''}
                                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                            className="border rounded-full p-2 w-[150px]"
                                        />
                                        : null}     
                                    </RadioGroup>
                                </div>                  
                                <div className="font-bold">Location</div>
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
                                                className="text-black bg-white w-[150px] h-10 border rounded-full pl-4"
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
                                                className="text-black bg-white w-[150px] h-10 border rounded-full pl-4"
                                            /> 
                                        </div>
                                    </span>
                                    <span>
                                        <div>
                                            <input 
                                                type="text"
                                                name="street"
                                                placeholder="Street"
                                                value={formData.street}
                                                onChange={handleChange}
                                                required
                                                className="text-black bg-white w-[150px] h-10 border rounded-full pl-4"
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
                                                className="text-black bg-white w-[150px] h-10 border rounded-full pl-4"
                                            /> 
                                        </div>
                                    </span>
                                </div>
                                
                            </div>
                            <div className="flex-col flex-wrap w-2/4 space-y-4 pl-10">
                                <div className="font-bold">Course and Year</div>
                                <div>
                                    <input 
                                        type="text"
                                        name="course"
                                        placeholder="BSCS-3"
                                        value={formData.course}
                                        onChange={handleChange}
                                        required
                                        className="text-black bg-white w-[320px] h-10 border rounded-full pl-4"
                                    /> 
                                </div>
                                <div className="font-bold">School</div>
                                <div>
                                    <input 
                                        type="text"
                                        name="school"
                                        placeholder="Cebu Institute of Technology"
                                        value={formData.school}
                                        onChange = {handleChange}
                                        required
                                        className="text-black bg-white w-[320px] h-10 border rounded-full pl-4"
                                    /> 
                                </div>
                                <div className="font-bold">Role</div>
                                <RadioGroup defaultValue="comfortable" className="inline-grid grid-cols-2 gap-4">
                                    <span  onClick={()=> {formData.role = "Tutor"; setRoles("tutor")}} className={`${roles == "tutor" ? 'bg-red-300 text-black' : 'bg-white text-gray-500'} flex items-center space-x-2 w-[150px] hover:bg-red-300 hover:text-black h-10 border rounded-full pl-4`}>
                                        <RadioGroupItem className = "hidden peer" value="Tutor" id="tutor" />
                                        <Label htmlFor="tutor" >Tutor</Label>
                                    </span>
                                    <span onClick={()=> {formData.role = "Listener"; setRoles("listener")}} className={`${roles == "listener" ? 'bg-red-300 text-black' : 'bg-white text-gray-500'} flex items-center space-x-2 w-[150px] hover:bg-red-300 hover:text-black h-10 border rounded-full pl-4`}>
                                        <RadioGroupItem className = "hidden peer" value="Listener" id="listener" />
                                        <Label htmlFor="listener" >Listener</Label>
                                    </span>
                                </RadioGroup>
                            </div>
                        </div> 
                        <div className="flex flex-wrap justify-end absolute right-10 bottom-10 w-2/4 space-x-4">
                                
                                <button type="button" data-modal-hide = "select-modal" onClick={() => setModalVisible(false)} className="border-gray-700 border drop-shadow-lg text-gray-700 bg-white hover:bg-red-300 rounded-full text-sm w-1/5 h-11 flex items-center justify-center">
                                <span className="flex items-center space-x-3">
                                    <span>Back</span>
                                </span>
                                </button>
                                
                                
                                
                                <button type="button" data-modal-hide = "select-modal" onClick={() => {setModalVisible(false); console.log(formData);}} className="drop-shadow-lg text-white bg-indigo-900 hover:bg-blue-800 rounded-full text-sm w-2/5 h-11 flex items-center justify-center">
                                <span className="flex items-center space-x-3">
                                    <span>Continue</span>
                                </span>
                                </button>
                            
                        </div>
                        </div>
                    </div>
                </div>  
            </div>
            )}
        </form>
    </div>
    );
}