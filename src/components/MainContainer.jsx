import React from 'react'
import { useSelector } from 'react-redux'
import Videotitle from './Videotitle'
import VideoBackground from './VideoBackground'
const MainContainer = () => {
    const movies=useSelector(store=>store.movies.nowPlayingMovies)
    if(!movies) return null;
    const mainMovie=movies[0];
    console.log(mainMovie);
    const {original_title,overview,id}=mainMovie;
  return (
  <>
  <Videotitle
  title={original_title}
  description={overview}
  />
  <VideoBackground
  movieId={id}
  />
  </>
  )
}

export default MainContainer