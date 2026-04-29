import { useSelector } from 'react-redux'
import useMovieTrailer from '../hooks/useMovieTrailer';

const VideoBackground = ({movieId}) => {
  const trailerVideo = useSelector(store => store.movies?.trailerVideo);
  
  // Fetch trailer
  useMovieTrailer(movieId);

  // Early return to prevent iframe errors before the video key loads
  if (!trailerVideo) return null;

  return (
    <div className="relative w-screen">
      <div className="aspect-video w-full overflow-hidden">
        <iframe
          className="h-full w-full object-cover"
          // Added ?autoplay=1&mute=1 to the URL
          src={`https://www.youtube.com/embed/${trailerVideo?.key}?autoplay=1&mute=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default VideoBackground;