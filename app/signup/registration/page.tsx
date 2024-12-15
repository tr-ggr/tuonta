"use client";
// import "server-only"
import React from "react";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"   
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


export default function Registration1(){
    const [date, setDate] = React.useState<Date>()

    const [formData, setFormData] = useState({
        username: '',
        gender: '',
        country: '',
        city: '',
        province: '',
        barangary:'',
        date: '',
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
                                <RadioGroup defaultValue="comfortable">
                                <div className="flex items-center space-x-2 bg-white w-[280px] h-10 border rounded-full pl-4">
                                    <RadioGroupItem value="default" id="r1" />
                                    <Label htmlFor="r1">Male</Label>
                                </div>
                                <div className="flex items-center space-x-2 bg-white w-[280px] h-10 border rounded-full pl-4">
                                    <RadioGroupItem value="comfortable" id="r2" />
                                    <Label htmlFor="r2">Female</Label>
                                </div>
                                </RadioGroup>
                            </div>                  
                            <div>Location</div>
                            <div>
                            <div>
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
                            </div>

                            <div>
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
                            </div>
                            </div>
                            
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
                    </form>
                </div>
            </div>  
        </div>
    )
}