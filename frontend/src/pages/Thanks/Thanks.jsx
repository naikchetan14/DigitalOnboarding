import React from 'react'
import { Link } from 'react-router-dom'

const Thanks = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-2'>
        <img src="https://cdn-icons-png.flaticon.com/512/10741/10741986.png" alt='Thanks Image' className='flex-1 w-[500px]'></img>
        <p className='text-green-900 font-bold text-center'>Your Details Successfully Submitted Thanks!</p>
        <Link to={'/'} className='text-2xl font-bold text-violet-950'><p>Go back To Home</p></Link>
    </div>
  )
}

export default Thanks