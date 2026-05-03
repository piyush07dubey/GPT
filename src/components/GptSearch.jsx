import React from 'react'
import GptMovieSuggestions from './GptMovieSuggestions'
import GptSearchBar from './GptSearchBar'
import image1 from '../assets/image1.png'

const GptSearch = () => {
  return (
    
        <div className='fixed -z-10'>
         <img
                  src={image1}
                  alt="background"
                  className="w-full object-cover h-screen "
                />
                <div className='pt-[30%] md:p-0'>
        </div>
        <GptSearchBar/>
        <GptMovieSuggestions/>
        </div>
  )
}

export default GptSearch