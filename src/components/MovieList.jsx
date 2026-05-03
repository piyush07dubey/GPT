import React from 'react'
import MovieCard from "./MovieCard"

const MovieList = ({title,movies}) => {
  if (!movies || movies.length === 0) return null;
  return (
    <div className="px-4 md:px-12">
      <h1 className="text-lg md:text-3xl py-4 text-white font-semibold drop-shadow-md">{title}</h1>
      <div className="flex gap-4 overflow-x-scroll py-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        {movies.map((movie)=><MovieCard poster_path={movie.poster_path} key={movie.id}/>)}
      </div> 
    </div>
  )
}

export default MovieList