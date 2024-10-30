import React from 'react'
import { NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-y-1 mt-8 px-4'>
      <h1 className='text-gray-800 font-medium text-2xl sm:text-3xl lg:text-4xl'>Welcome, Admin!</h1>
      <p className='font-medium text-gray-500 text-xs sm:text-sm lg:text-base'>
      Select an activity to get started.
      </p>
      <div className='flex flex-col gap-4 mt-10 sm:flex-row'>
        <NavLink to='/add' className='flex w-32 h-16 bg-[#004DFF] text-white font-medium items-center justify-center shadow-md rounded-md'>
          Add Items
        </NavLink>
        <NavLink to='/list' className='flex w-32 h-16 bg-[#004DFF] text-white font-medium items-center justify-center shadow-md rounded-md'>
          View List
        </NavLink>
        <NavLink to='/orders' className='flex w-32 h-16 bg-[#004DFF] text-white font-medium items-center justify-center shadow-md rounded-md'>
          View Orders
        </NavLink>
      </div>
    </div>
  )
}

export default Home
