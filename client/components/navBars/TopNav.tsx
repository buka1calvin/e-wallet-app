"use client"
import { formatDate } from '@/lib/formatDate';
import React, { useState } from 'react'
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import Search from '../ui/Search';
import { User } from '@/types';

const TopNav = ({user}:{user:User | null}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const currentDate=new Date()

    
  return (
    <section className='w-full h-full flex justfiy-between items-center px-6'>
      <div className="w-full flex flex-col justify-start items-start">
        <h1 className="font-bold text-xl">
            Hello, {`${user?.firstName} ${user?.lastName}`}
        </h1>
        <div className="flex items-center justify-center text-neutral-500">
            <span className="text-sm">{formatDate(currentDate)}</span>
        </div>
      </div>
      <div className="w-full flex items-center justify-end gap-3">
        <div className="relative bg-secondary/10 text-secondary hover:text-neutral-700 hover:bg-neutral-100 text-3xl h-9 w-9 flex items-center justify-center rounded">
            <IoNotificationsOutline/>
            <div className=""/>
        </div>
        <Search
                placeholders={[
                    "Search by name",
                    "Search by Description",
                  ]}
                  onChange={(e)=>setSearchTerm(e.target.value)}
                  onSubmit={(e)=>e.preventDefault()}
        />
      </div>
    </section>
  )
}

export default TopNav
