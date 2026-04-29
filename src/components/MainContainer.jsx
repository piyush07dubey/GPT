import React from 'react'
import { useSelector } from 'react-redux'
import Videotitle from './Videotitle'
import VideoBackground from './VideoBackground'
import { IMG_CDN_URL } from '../utils/constants'
const MainContainer = () => {
    const movies=useSelector(store=>store.movies.nowPlayingMovies)
    if(!movies) return null;
    const mainMovie=movies[0];
    console.log(mainMovie);
    const {original_title,overview,id,poster_path}=mainMovie;
  return (
  <>
  <Videotitle
  title={original_title}
  overview={overview}
  />
  <div className="relative w-screen">
    <VideoBackground movieId={id} />
    {poster_path && (
      <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-8 z-10">
        <div className="w-36 md:w-48 shrink-0 transition-all duration-300 hover:scale-105 cursor-pointer">
         
        </div>
      </div>
    )}
  </div>
  </>
  )
}

export default MainContainer
