import React from 'react'

const Videotitle = ({title,overview}) => {
  return (
   <>
   <div className='pt-36 px-12'>
    <h1 className='text-6xl font-bold'>{title}</h1>
    <p className='py-6 text-lg w-1/4'>{overview}</p>
    <div>
        <button className='bg-gray-500 bg-opacity-50 rounded-lg text-white p-4 px-12 text-xl mx-6'>▶️Play</button>
        <button className='bg-gray-500 bg-opacity-50 rounded-lg text-white p-4 px-12 text-xl mx-6'>More Info</button>
    </div>
   </div>
   </>
  )
}

export default Videotitle   