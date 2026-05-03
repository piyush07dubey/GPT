import React, { useRef } from 'react'
import lang from '../utils/languageConstants'
import {useSelector,useDispatch} from 'react-redux'
import { addGptMovieResult } from '../utils/gptSlice'


const GptSearchBar = () => {
    const langKey=useSelector((store)=>store.config.lang)
    const searchText=useRef(null)
    const dispatch=useDispatch();
    const searchMovieTMDB=async(movie)=>{
       const data=await fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,API_OPTIONS)
       const json=await data.json();
       return json.results;
    }
    const handleGptSearchClick = async () => {
    // 1. Define the query inside the click handler to get the latest value
    const getQuery = "Act as a movie Recommendation system and suggest some movies for the query: " + 
                     searchText.current.value + 
                     ". Only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Sholay, Gadar, Golmaal, Koi Mil Gaya, Don";

    // 2. Get GPT/Groq results
    const gptResults = await groq.chat.completions.create({
        messages: [{ role: "user", content: getQuery }],
        model: "llama-3.1-8b-instant",
    });

    // 3. Extract the movie names string
    const getMovies = gptResults.choices?.[0]?.message?.content;
    if (!getMovies) return;

    const promiseArray = getMovies.map(movie => searchMovieTMDB(movie));

    const tmdbResults = await Promise.all(promiseArray);

   dispatch(addGptMovieResult({movieNames:getMovies,movieResults:tmdbResults}))
};
  return (
    <div className='md:pt-[10%] pt-[35%] flex justify-center'>
        <form className='md:w-1/2 w-full bg-white grid grid-cols-12' onSubmit={(e)=>e.preventDefault()}>
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