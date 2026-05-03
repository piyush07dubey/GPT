import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
// FIX 1: Import the Redux action you are trying to dispatch
import { addTrailerVideo } from "../utils/movieSlice"; 

// FIX 2: Pass movieId as an argument to the hook
const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
const trailerVideo=useSelector(store=>store.movies.trailerVideo)
  const getMovieVideos = async () => {
    // Optional but recommended: Safety check so it doesn't fetch if movieId is missing
    if (!movieId) return;

    try {
      // Changed to a template literal for cleaner string interpolation
      const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos`, API_OPTIONS);
      const data = await res.json();

      const filterData = data.results?.filter((video) => video.type === "Trailer");
      const trailer = filterData?.length > 0 ? filterData[0] : (data.results ? data.results[0] : null);
      
      dispatch(addTrailerVideo(trailer));
    } catch (error) {
      console.error("Failed to fetch movie videos:", error);
    }
  }

  useEffect(() => {
    if(!trailerVideo){
    getMovieVideos();
  // FIX 3: Add movieId to the dependency array
}} ,[movieId]);  
};

export default useMovieTrailer;