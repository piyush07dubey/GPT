import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import PopularMovies from '../hooks/usePopularMovies';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import GptSearch from './GptSearch';
import { useSelector } from 'react-redux';

const Browse = () => {
  useNowPlayingMovies();
  PopularMovies();
  const showGptSearch=useSelector((store)=>store.gpt.showGptSearch);
  return (
  <>
  <Header/>
  {showGptSearch ? <GptSearch/> : (
    <>
    <MainContainer/>
    <SecondaryContainer/>
    </>
  )}
  </>
  )
}

export default Browse