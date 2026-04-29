import React from 'react'
import { IMG_CDN_URL } from '../utils/constants'
function MovieCard({poster_path}) {
  // If no poster path is available, you might want to skip rendering or show a placeholder
  if (!poster_path) return null;

  return (
   <div className='w-36 md:w-48 pr-4 shrink-0 transition-all duration-300 hover:scale-105 cursor-pointer'>
    <img 
      className='rounded-md shadow-lg object-cover w-full h-full' 
      alt="Movie Card" 
      src={IMG_CDN_URL + poster_path} 
    />
   </div>
  )
}

export default MovieCard 