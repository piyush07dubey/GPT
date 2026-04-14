import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";

const useMovieTrailer=()=>{

  const dispatch=useDispatch();
  const getMovieVideos=async()=>{
    const res=await fetch("https://api.themoviedb.org/3/movie/"+movieId+"/videos",API_OPTIONS);
    const data=await res.json();
    console.log(data);


    const filterData=data.results?.filter((video)=>video.type==="Trailer");
    const trailer = filterData?.length > 0 ? filterData[0] : (data.results ? data.results[0] : null);
    dispatch(addTrailerVideo(trailer));
  }

  useEffect(()=>{
    getMovieVideos();
  },[]);
};

export default useMovieTrailer;


