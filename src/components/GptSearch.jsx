import React from 'react'
import GptMovieSuggestions from './GptMovieSuggestions'
import GptSearchBar from './GptSearchBar'
import image1 from '../assets/image1.png'

const GptSearch = () => {
  return (
    <div>
        <div className='absolute -z-10'>
         <img
                  src={image1}
                  alt="background"
                  className="h-full w-full object-cover "
                />
        </div>
        <GptSearchBar/>
        <GptMovieSuggestions/>
   
    </div>
  )
}

export default GptSearch