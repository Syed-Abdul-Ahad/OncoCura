import React from 'react'
import {assets} from '../assets/assets'
import { useNavigate } from 'react-router-dom'


const Navbar = ({setToken}) => {

const navigate = useNavigate();

  return (
    <div className='flex items-center py-2 justify-between px-[4%]'>
      <img onClick={()=>navigate('/')} className='w-[max(8%,80px)] cursor-pointer' src={assets.logo} alt="" />
      <button onClick={()=>setToken('')} className='bg-[#004DFF] text-white px-1 py-1 sm:px-7 sm:py-2 rounded text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar
