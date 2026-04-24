
import {  useSelector } from 'react-redux'

import useMovieTrailer from '../hooks/useMovieTrailer';


const VideoBackground = ({movieId}) => {
  const trailerVideo=useSelector(store=>store.movies.trailerVideo);
  useMovieTrailer(movieId);
  return (
    <div className="relative w-screen">
      <div className="aspect-video w-full overflow-hidden">
        <iframe
          className="h-full w-full object-cover"
          src={`https://www.youtube.com/embed/${trailerVideo?.key}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default VideoBackground