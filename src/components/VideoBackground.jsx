import React, { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constants.js'
import { useDispatch, useSelector } from 'react-redux'
import { addTrailerVideo } from '../utils/movieSlice.js';
import useMovieTrailer from '../hooks/useMovieTrailer.js';


const VideoBackground = ({movieId}) => {
  const trailerVideo=useSelector(store=>store.movies.trailerVideo);
  useMovieTrailer(movieId);
  return (
    <div>
       <iframe width="560" 
        height="315" 
        src={"https://www.youtube.com/embed/"+trailerVideo?.key}
         title="YouTube video player"
           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        
      >  </iframe>
    </div>
  )
};

export default VideoBackground