import React, { useRef } from 'react'
import lang from '../utils/languageConstants'
import {useSelector} from 'react-redux'
import {groq} from "../utils/Groq"

const GptSearchBar = () => {
    const langKey=useSelector((store)=>store.config.lang)
    const searchText=useRef(null)
    const handleGptSearchClick=async()=>{
        const gptResults = await groq.chat.completions.create({
  messages: [{ role: "user", content: getQuery }],
  model: "llama-3.1-8b-instant",
});  
    }
    const getQuery="Act as a movie Recommendation system and suggest some movies for the query"+searchText.current.value+"only give me names of 5 movies,comma seperated  like the example result given ahead,Example Result:Sholay,Gadar,Golmaal,koi mil gaya"
  return (
    <div className='pt-[20%] flex justify-center'>
        <form className='w-1/2 bg-white grid grid-cols-12' onSubmit={(e)=>e.preventDefault()}>
            <input ref={searchText} type='text' className='m-4 p-4 col-span-9'
            placeholder={lang[langKey].gptSearchPlaceholder}/>
            <button onClick={handleGptSearchClick} className='py-2 m-4 px-4 bg-red-700 text-white rounded-lg col-span-3'>
                {lang[langKey].search}
            </button>
        </form>
    </div>
  )
}

export default GptSearchBar 